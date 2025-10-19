import type {Recipe} from "@/types/recipe";
import RoundedLike from "@/app/components/Rounded";
import Image from "next/image";

interface RecipeProps {
    id: string;
    recipe: Recipe;
    tags: string[];
    imageUrl?: string;
}

export default function RecipeCard({id, recipe, tags, imageUrl}: RecipeProps) {
    const calories = [
        {label: "Total", value: recipe.calories.total},
        {label: "Protein", value: recipe.calories.protein},
        {label: "Carbs", value: recipe.calories.carbs},
        {label: "Fat", value: recipe.calories.fat},
    ];
    return (
        <div
            key={id}
            rel="noopener noreferrer"
            className="overflow-hidden block"
        >
            <div className="p-4">
                <h4 className="text-5xl font-bold mb-5 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                    {recipe.name}
                </h4>

                {/* Tags */}
                <div className="flex gap-2 mb-4 flex-wrap">
                    {tags.map((tag: string, idx: number) => (
                        <span
                            key={idx}
                            className="px-2 py-1 border rounded-full text-sm text-neutral-50"
                        >
              {tag}
            </span>
                    ))}
                </div>

                {/* Ingredients | Steps | Calories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Ingredients */}
                    <RoundedLike>
                        <h5 className="font-semibold text-orange-600 mb-2 text-lg">
                            Ingredients
                        </h5>
                        <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                            {recipe.ingredients.map((ing: string, idx: number) => (
                                <li key={idx}>{ing}</li>
                            ))}
                        </ul>
                    </RoundedLike>

                    {/* Steps */}
                    <RoundedLike>
                        <h5 className="font-semibold text-orange-600 mb-2 text-lg">Steps</h5>
                        <ol className="text-sm text-gray-700 list-decimal pl-4 space-y-1">
                            {recipe.steps.map((step: string, idx: number) => (
                                <li key={idx}>{step}</li>
                            ))}
                        </ol>
                    </RoundedLike>

                    {/* Calories */}
                    <div
                        className="bg-gradient-to-b from-yellow-100 to-orange-50 rounded-xl shadow-md border border-orange-200 p-0 overflow-hidden">
                        <div className="bg-orange-500 text-white text-lg font-semibold py-2 text-center">
                            Calories & Nutrition
                        </div>
                        <div className="p-4 flex flex-col justify-center text-center">
                            <ul className="space-y-2">
                                {calories.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex justify-between text-gray-800 text-sm"
                                    >
                                        <span className="font-medium">{item.label}</span>
                                        <span>{item.value}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 w-full h-40 relative rounded-lg overflow-hidden bg-gray-100">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={recipe.name}
                                        fill
                                        style={{objectFit: "cover"}}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
