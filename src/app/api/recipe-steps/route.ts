import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

interface RecipeStepsRequest {
  recipe_name: string;
  ingredients: string[];
  cuisine: string;
}

interface RecipeStep {
  step_number: number;
  instruction: string;
  image_required: boolean;
  estimated_time_minutes: number;
  temperature?: string;
  equipment?: string[];
}

interface RecipeStepsResponse {
  steps: RecipeStep[];
}

export async function POST(req: NextRequest) {
  try {
    const { recipe_name, ingredients, cuisine }: RecipeStepsRequest = await req.json();

    if (!recipe_name || typeof recipe_name !== "string") {
      return NextResponse.json({ error: "Recipe name is required" }, { status: 400 });
    }

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: "Ingredients array is required" }, { status: 400 });
    }

    if (!cuisine || typeof cuisine !== "string") {
      return NextResponse.json({ error: "Cuisine is required" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const instructions = `
You are a professional chef creating detailed step-by-step instructions for a recipe. Break down the recipe into individual steps that can be inserted into a database.

Requirements:
- Create 5-15 detailed steps that cover the entire cooking process
- For each step, determine if an image would be helpful for the user (image_required: true/false)
- Steps that typically need images: plating, cutting techniques, mixing consistency, browning stages, final presentation
- Steps that typically don't need images: simple mixing, seasoning, waiting, basic prep
- Include estimated time for each step
- Add temperature and equipment when relevant
- Make instructions clear and actionable

Recipe: ${recipe_name}
Cuisine: ${cuisine}
Main ingredients: ${ingredients.join(", ")}

Output ONLY JSON per the schema.
`;

    const RESPONSE_SCHEMA = {
      type: "object",
      properties: {
        steps: {
          type: "array",
          items: {
            type: "object",
            properties: {
              step_number: { type: "number" },
              instruction: { type: "string" },
              image_required: { type: "boolean" },
              estimated_time_minutes: { type: "number" },
              temperature: { type: "string" },
              equipment: { type: "array", items: { type: "string" } }
            },
            required: ["step_number", "instruction", "image_required", "estimated_time_minutes"]
          }
        }
      },
      required: ["steps"]
    } as const;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: instructions }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA
      }
    });

    if (!result) {
      return NextResponse.json({ error: "Empty model response" }, { status: 502 });
    }

    const text = result.text as string;

    let json: RecipeStepsResponse;
    try {
      json = JSON.parse(text);
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
      return NextResponse.json({ error: "Model returned non-JSON" }, { status: 502 });
    }

    const validatedSteps = json.steps.map((step, index) => ({
      ...step,
      step_number: index + 1,
      image_required: Boolean(step.image_required),
      estimated_time_minutes: Number(step.estimated_time_minutes) || 5
    }));

    return NextResponse.json({ 
      recipe_name,
      steps: validatedSteps 
    });

  } catch (error: unknown) {
    console.error("Error generating recipe steps:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
