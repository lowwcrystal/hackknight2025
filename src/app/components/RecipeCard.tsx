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
    const tags = ["todo", "todo2", "todo3"]
    return (
        <a
            key={recipe.id}
            href={`/recipe/${recipe.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform block"
        >
            <div className="p-4">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">
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
        </a>
    );
}