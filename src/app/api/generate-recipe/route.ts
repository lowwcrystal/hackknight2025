import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

interface RecipeRequest {
  ingredients: string[];
  cuisine: string;
}

interface RecipeResponse {
  name: string;
  description: string;
  calories: number;
  image_url: string;
  ingredients: string[];
  cuisine: string;
  prep_time: number;
  cook_time: number;
  servings: number;
}

export async function POST(req: NextRequest) {
  try {
    const { ingredients, cuisine }: RecipeRequest = await req.json();

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: "Ingredients array is required" }, { status: 400 });
    }

    if (!cuisine || typeof cuisine !== "string") {
      return NextResponse.json({ error: "Cuisine is required" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const instructions = `
You are a professional chef and recipe developer. Generate a complete recipe based on the provided ingredients and cuisine type.

Requirements:
- Create a recipe that uses the provided ingredients as the main components
- Match the specified cuisine style and cooking techniques
- Provide accurate calorie estimation per serving
- Generate a realistic image URL using Unsplash or similar stock photo services (use format like: https://images.unsplash.com/photo-[timestamp]-[id]?ixlib=rb-4.0.3&ixid=[id]&auto=format&fit=crop&w=800&q=80)
- Include appropriate prep time and cook time
- Make the recipe practical and achievable for home cooks

Ingredients provided: ${ingredients.join(", ")}
Cuisine: ${cuisine}

Output ONLY JSON per the schema.
`;

    const RESPONSE_SCHEMA = {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        calories: { type: "number" },
        image_url: { type: "string" },
        ingredients: { type: "array", items: { type: "string" } },
        cuisine: { type: "string" },
        prep_time: { type: "number" },
        cook_time: { type: "number" },
        servings: { type: "number" }
      },
      required: ["name", "description", "calories", "image_url", "ingredients", "cuisine", "prep_time", "cook_time", "servings"]
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

    let json: RecipeResponse;
    try {
      json = JSON.parse(text);
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
      return NextResponse.json({ error: "Model returned non-JSON" }, { status: 502 });
    }

    return NextResponse.json({ recipe: json });

  } catch (error: unknown) {
    console.error("Error generating recipe:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
