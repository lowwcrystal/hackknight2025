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
- Create a recipe, with a condensed name, with 5-15 detailed steps that uses the provided ingredients as the core components, while pantry ingredients can be used as well.
- Match the specified cuisine style and cooking techniques
- Provide accurate calorie estimation per category, the serving size is one person
- Include appropriate prep time and cook time
- Make the recipe practical and achievable for home cooks
- The recipe should be a single serving and very healthy. 

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
            
            // Add "g" to the end of each measurement in ingredients
            recipeData.ingredients = recipeData.ingredients.map((ingredient: string) => {
                // Common units that shouldn't get "g" added
                const units = ['g', 'kg', 'ml', 'l', 'cup', 'cups', 'tbsp', 'tsp', 'oz', 'lb', 'pound', 'pounds', 'piece', 'pieces'];
                const unitPattern = new RegExp(`\\b(${units.join('|')})\\b`, 'i');
                
                // Find numbers (with optional decimals) followed by space or end of string
                // and add "g" if not already followed by a unit
                return ingredient.replace(/(\d+(?:\.\d+)?)(\s+|$)/g, (match, number, space, offset, fullString) => {
                    const afterMatch = fullString.substring(offset + match.length);
                    const trimmedAfter = afterMatch.trim();
                    
                    // If there's already a unit word after the number, don't add "g"
                    if (unitPattern.test(trimmedAfter)) {
                        return match;
                    }
                    // If the number is already followed by "g", don't add another
                    if (trimmedAfter.toLowerCase().startsWith('g')) {
                        return match;
                    }
                    // Otherwise, add "g" after the number
                    return `${number}g${space}`;
                });
            });
        } catch (error) {
            console.error("Failed to parse JSON response:", error);
            return NextResponse.json({error: "Invalid AI response"}, {status: 502});
        }

        // Image generation using Cloudflare Workers AI (optional - recipe can be created without image)
        let imagePath: string | null = null;
        
        try {
            const imagePrompt = `A high-quality, realistic photo of "${recipeData.name}" with ingredients: ${recipeData.ingredients.join(", ")}, styled as a ${cuisine} dish.`;

            const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
            const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

            if (CLOUDFLARE_ACCOUNT_ID && CLOUDFLARE_API_TOKEN) {
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

                if (!imageResponse.ok) {
                    console.warn("Cloudflare image generation failed:", imageResponse.status, imageResponse.statusText);
                } else {
                    // Cloudflare may return binary (PNG) or JSON
                    const contentType = imageResponse.headers.get("content-type");
                    let imageBuffer: Buffer;

                    if (contentType && contentType.includes("application/json")) {
                        // JSON response with base64 field
                        const resultJson = await imageResponse.json();
                        console.log("Cloudflare JSON response:", JSON.stringify(resultJson).substring(0, 200));
                        const base64 = resultJson.result?.image || resultJson.image || resultJson.data;
                        if (!base64) {
                            console.warn("No image found in JSON response, continuing without image");
                        } else {
                            imageBuffer = Buffer.from(base64, "base64");
                            // Upload to Supabase
                            imagePath = `recipes/${Date.now()}.png`;
                            const {error} = await supabase.storage
                                .from("recipe-images")
                                .upload(imagePath, imageBuffer, {
                                    contentType: "image/png",
                                    upsert: true,
                                });

                            if (error) {
                                console.error("Supabase upload error:", error);
                                imagePath = null; // Continue without image
                            }
                        }
                    } else {
                        // Binary image (PNG) returned directly
                        const arrayBuffer = await imageResponse.arrayBuffer();
                        imageBuffer = Buffer.from(arrayBuffer);
                        // Upload to Supabase
                        imagePath = `recipes/${Date.now()}.png`;
                        const {error} = await supabase.storage
                            .from("recipe-images")
                            .upload(imagePath, imageBuffer, {
                                contentType: "image/png",
                                upsert: true,
                            });

                        if (error) {
                            console.error("Supabase upload error:", error);
                            imagePath = null; // Continue without image
                        }
                    }
                }
            } else {
                console.warn("Cloudflare credentials not configured, skipping image generation");
            }
        } catch (imageError) {
            console.error("Image generation error (continuing without image):", imageError);
            // Continue without image - recipe creation should not fail due to image generation issues
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
