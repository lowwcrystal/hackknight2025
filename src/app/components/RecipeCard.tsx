import Image from "next/image";
import type {Recipe} from "@/types/recipe";

interface RecipeProps {
    recipe: Recipe;
}

export default function RecipeCard({recipe}: RecipeProps) {
    const content = recipe.content;
    const ingredients = content
        .substring(0, content.indexOf("Instructions:"))
        .split("\n")
        .filter(line => line.trim() !== "" && !line.startsWith("Ingredients:"));
    const instructions = content
        .substring(content.indexOf("Instructions:") + "Instructions:".length)
        .split("\n")
        .filter(line => line.trim() !== "" && !line.startsWith("Instructions:"));
    const tags = Object.values(recipe.tags) as string[];
    return (
        <div
            key={recipe.id}
            rel="noopener noreferrer"
            className="overflow-hidden block"
        >
            <div className="p-4">
                <h4 className="text-5xl font-bold mb-10 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                    {recipe.title}
                </h4>

                {/* Tags */}
                <div className="flex gap-2 mb-4 flex-wrap">
                    {tags.map((tag: string, idx: number) => (
                        <span
                            key={idx}
                            className="px-2 py-1 border rounded-full text-sm text-gray-600"
                        >
              {tag}
            </span>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Ingredients */}
                    <div>
                        <h5 className="font-semibold mb-1">Ingredients:</h5>
                        <ul className="text-sm text-gray-700 list-disc pl-4">
                            {ingredients.map((ing: string, idx: number) => (
                                <li key={idx}>{ing}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Steps */}
                    <div>
                        <h5 className="font-semibold mb-1">Steps:</h5>
                        <ol className="text-sm text-gray-700 pl-4">
                            {instructions.map((step: string, idx: number) => (
                                <li key={idx}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    {/* Calories */}
                    {/*<div>*/}
                    {/*    <h5 className="font-semibold mb-1">Calories:</h5>*/}
                    {/*    <ul className="text-sm text-gray-700 list-disc pl-4">*/}
                    {/*        {calories.map((cal: string, idx: number) => (*/}
                    {/*            <li key={idx}>{cal}</li>*/}
                    {/*        ))}*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            </div>

            {/* Optional image placeholder */}
            <div className="relative w-full h-32">
                <Image
                    src={"/popular_recipes/rata.jpg"} // Replace with recipe image if available
                    alt={recipe.title}
                    fill
                    style={{objectFit: "cover"}}
                />
            </div>
        </div>
    );
}