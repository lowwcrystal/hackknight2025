import {createClient} from "@/utils/supabase/server";
import Recipe from "@/app/components/RecipeAttempt";
import {UserRecipe} from "@/types/userRecipe";

export default async function RecipePage({params,}: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params;
    const supabase = await createClient();
    const {data: userRecipes, error} = await supabase
        .from("recipes")
        .select(`id, title, image_path`)
        .order("id", {ascending: false})
        .overrideTypes<UserRecipe[]>();

    if (error) {
        console.error("Error loading recipe:", error);
        return <p>Failed to load recipe</p>;
    }

    if (!userRecipes) {
        return <div>Recipes not found</div>;
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-semibold mb-6">All Generated Recipes</h1>

            {userRecipes.length === 0 ? (
                <p>No recipes found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {userRecipes.map((recipe) => (
                        <Recipe
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            imageUrl={recipe.imageUrl}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
