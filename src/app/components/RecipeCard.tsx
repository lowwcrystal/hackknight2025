import type {Recipe} from "@/types/recipe";
import RoundedLike from "@/app/components/Rounded";

interface RecipeProps {
    recipe: Recipe;
}

export default function RecipeCard({recipe}: RecipeProps) {
    const content = recipe.content;
    const ingredients = content
        .substring(0, content.indexOf("Instructions:"))
        .split("\n")
        .filter((line) => line.trim() !== "" && !line.startsWith("Ingredients:"));

    const instructions = content
        .substring(content.indexOf("Instructions:") + "Instructions:".length)
        .split("\n")
        .filter((line) => line.trim() !== "" && !line.startsWith("Instructions:"))
        .map(line => line.replace(/^\d+\.\s*/, ""));

    const tags = Object.values(recipe.tags) as string[];

    // Placeholder calorie data
    const calories = [
        {label: "Total", value: "520 kcal"},
        {label: "Protein", value: "32g"},
        {label: "Carbs", value: "45g"},
        {label: "Fat", value: "18g"},
    ];

    // Placeholder user photos
    const userPhotos = [
        "/placeholders/photo1.jpg",
        "/placeholders/photo2.jpg",
        "/placeholders/photo3.jpg",
        "/placeholders/photo4.jpg",
    ];

    return (
        <div
            key={recipe.id}
            rel="noopener noreferrer"
            className="overflow-hidden block"
        >
            <div className="p-4">
                <h4 className="text-5xl font-bold mb-5 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
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

                {/* Ingredients | Steps | Calories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Ingredients */}
                    <RoundedLike>
                        <h5 className="font-semibold text-orange-600 mb-2 text-lg">
                            Ingredients
                        </h5>
                        <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                            {ingredients.map((ing: string, idx: number) => (
                                <li key={idx}>{ing}</li>
                            ))}
                        </ul>
                    </RoundedLike>

                    {/* Steps */}
                    <RoundedLike>
                        <h5 className="font-semibold text-orange-600 mb-2 text-lg">Steps</h5>
                        <ol className="text-sm text-gray-700 list-decimal pl-4 space-y-1">
                            {instructions.map((step: string, idx: number) => (
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
                            <div className="mt-4 text-xs text-gray-500 italic">
                                *Values per serving
                            </div>
                        </div>
                    </div>
                </div>


                {/* User Photos Section */}
                <section className="mt-8">
                    <h5 className="text-3xl font-semibold text-orange-600 mt-10 mb-4">Your Attempts</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {userPhotos.map((photo, idx) => (
                            <RoundedLike
                                key={idx}
                            >
                                <div></div>
                            </RoundedLike>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
