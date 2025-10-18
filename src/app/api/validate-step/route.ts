import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import urlToBase64 from '../../../functions/urlToBase64'

export const runtime = "nodejs";

const LABELS = ["raw","undercooked","cooked","overcooked","uncertain","not_food"] as const;

interface EvaluationResult {
  is_food: boolean;
  label: "raw" | "undercooked" | "cooked" | "overcooked" | "uncertain" | "not_food";
  quality_issues?: string[];
  alignment_score: number;
  alignment_notes?: string;
  confidence: number;
  advice?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { userImageUrl, stepText } = await req.json();

    if (!userImageUrl) {
      return NextResponse.json({ error: "The userImageUrl is missing" }, { status: 400 });
    }

   const { b64, mime } = await urlToBase64(userImageUrl);
    
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

    const instructions = `
You are a chef instructor evaluating a single photo based on the provided instructon using visual context clues. 
Tasks:
- Decide if the image primarily depicts edible food (is_food).
- If not food, set label="not_food".
- If food, choose exactly one label from: raw, undercooked, cooked, overcooked, or uncertain.
- List quality_issues (brief phrases, e.g., "burnt edges", "soggy", "underbrowned").
- If a step description is provided, loosely judge alignment to it as alignment_score (0..1) and alignment_notes; otherwise set alignment_score based on your best judgment of proper execution for what the image appears to be.

Output ONLY JSON per schema.
`;


    const parts = [
      { inlineData: { mimeType: mime, data: b64 } },
      { text: `${instructions}\n\n${stepText}` }
    ];

    const RESPONSE_SCHEMA = {
      type: "object",
      properties: {
        is_food: { type: "boolean" },
        label: { type: "string", enum: [...LABELS] },
        quality_issues: { type: "array", items: { type: "string" } },
        alignment_score: { type: "number" },     
        alignment_notes: { type: "string" },
        confidence: { type: "number" },          
        advice: { type: "string" }                
      },
      required: ["is_food","label","alignment_score","confidence"]
    } as const;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts }],
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA
      }
    });
    if (!result){
        return NextResponse.json({ error: "Empty model response" }, { status: 502 });
    }

    const text = result.text as string;

    let json: EvaluationResult;
    try {
      json = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Model returned non-JSON" }, { status: 502 });
    }

    if (typeof json.confidence === "number" && json.confidence < 0.7 && json.label !== "not_food") {
      json.label = "uncertain";
    }

    return NextResponse.json({ result: json });

  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}