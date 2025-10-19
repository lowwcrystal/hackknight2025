import {NextRequest, NextResponse} from "next/server";
import {GoogleGenAI} from "@google/genai";
import {createClient} from "@/utils/supabase/server";
import {Recipe} from "@/types/recipe";

export const runtime = "nodejs";

interface RecipeRequest {
    ingredients: string[];
    cuisine: string;
    user_id?: string;
}

export async function POST(req: NextRequest) {
    try {
        const {ingredients, cuisine, user_id}: RecipeRequest = await req.json();

        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return NextResponse.json({error: "Ingredients array is required"}, {status: 400});
        }

        if (!cuisine) {
            return NextResponse.json({error: "Cuisine is required"}, {status: 400});
        }

        const supabase = await createClient();
        const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

        // 1️⃣ Generate the recipe content
        const instructions = `
You are a professional chef and recipe developer. Generate a complete recipe based on the provided ingredients and cuisine type.

Requirements:
- Create a recipe, with a condensed name, with steps that uses the provided ingredients as the core components, while pantry ingredients can be used as well.
- Match the specified cuisine style and cooking techniques
- Provide accurate calorie estimation per category, the serving size is one person
- Include appropriate prep time and cook time
- Make the recipe practical and achievable for home cooks
- The recipe should be a single serving and healthy. 

Ingredients provided: ${ingredients.join(", ")}
Cuisine: ${cuisine}

Output ONLY JSON per the schema.
`;

        const RESPONSE_SCHEMA = {
            type: "object",
            properties: {
                name: {type: "string"},
                description: {type: "string"},
                calories: {
                    type: "object",
                    properties: {
                        total: {type: "number"},
                        protein: {type: "number"},
                        carbs: {type: "number"},
                        fat: {type: "number"},
                    },
                    required: ["total", "protein", "carbs", "fat"]
                },
                ingredients: {type: "array", items: {type: "string"}},
                steps: {type: "array", items: {type: "string"}},
            },
            required: ["name", "description", "calories", "ingredients", "steps"]
        } as const;

        const recipeResult = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{role: "user", parts: [{text: instructions}]}],
            config: {
                responseMimeType: "application/json",
                responseSchema: RESPONSE_SCHEMA
            }
        });

        if (!recipeResult) {
            return NextResponse.json({error: "Empty model response"}, {status: 502});
        }

        let recipeData: Recipe;
        try {
            recipeData = JSON.parse(recipeResult.text as string);
        } catch (error) {
            console.error("Failed to parse JSON response:", error);
            return NextResponse.json({error: "Invalid AI response"}, {status: 502});
        }

        // Image generation using Cloudflare Workers AI
        const imagePrompt = `A high-quality, realistic photo of "${recipeData.name}" with ingredients: ${recipeData.ingredients.join(", ")}, styled as a ${cuisine} dish.`;

        const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
        const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;

        // Call Cloudflare Workers AI
        const imageResponse = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({prompt: imagePrompt}),
            }
        );

        // Cloudflare may return binary (PNG) or JSON
        const contentType = imageResponse.headers.get("content-type");

        let imageBuffer: Buffer;

        if (contentType && contentType.includes("application/json")) {
            // JSON response with base64 field
            const resultJson = await imageResponse.json();
            const base64 = resultJson.result?.image;
            if (!base64) throw new Error("No image found in JSON response");
            imageBuffer = Buffer.from(base64, "base64");
        } else {
            // Binary image (PNG) returned directly
            const arrayBuffer = await imageResponse.arrayBuffer();
            imageBuffer = Buffer.from(arrayBuffer);
        }

        // Upload to Supabase
        const imagePath = `recipes/${Date.now()}.png`;

        const {data, error} = await supabase.storage
            .from("recipe-images")
            .upload(imagePath, imageBuffer, {
                contentType: "image/png",
                upsert: true,
            });

        if (error) {
            console.error("Supabase upload error:", error);
            return NextResponse.json({error: "Image upload error"}, {status: 502});
        }

        const {data: requestData, error: requestError} = await supabase
            .from("recipe_requests")
            .insert([{user_id}])
            .select("id")
            .single();

        if (requestError) {
            console.error("Error inserting recipe_request:", requestError);
            return NextResponse.json({error: "DB insert failed"}, {status: 500});
        }

        const promptText = `Ingredients: ${ingredients.join(", ")} | Cuisine: ${cuisine}`;
        const recipeContent = JSON.stringify(recipeData, null, 2);

        const {data: recipeRow} = await supabase
            .from("recipes")
            .insert([{
                request_id: requestData.id,
                title: recipeData.name,
                prompt: promptText,
                content: recipeContent,
                tags: [cuisine, ...ingredients],
                image_path: imagePath || null,
            }])
            .select("id")
            .single();

        if (!recipeRow) {
            console.error("Error inserting recipe");
            return NextResponse.json({error: "DB insert failed"}, {status: 500});
        }

        if (recipeData.steps && recipeData.steps.length > 0) {
            const stepsToInsert = recipeData.steps.map((instruction, index) => ({
                recipe_id: recipeRow.id,
                step_number: index + 1,
                instruction,
            }));

            const {error: stepsError} = await supabase
                .from("recipe_steps")
                .insert(stepsToInsert);

            if (stepsError) {
                console.error("Error inserting recipe steps:", stepsError);
                return NextResponse.json({error: "Recipe steps insert failed"}, {status: 500});
            }
        }

        return NextResponse.json({id: recipeRow.id});
    } catch (error: unknown) {
        console.error("Error generating recipe:", error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}
