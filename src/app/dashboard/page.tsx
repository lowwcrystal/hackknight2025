import {createClient} from "@/utils/supabase/server";
import {UserRecipe} from "@/types/userRecipe";
import Recipe from "@/app/components/RecipeAttempt";

export default async function DashboardPage() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
        return <p>Please log in to view your dashboard.</p>;
    }

    const {data, error} = await supabase
        .from("recipes")
        .select(`id, title, image_path, recipe_requests!inner(user_id)`)
        .eq("recipe_requests.user_id", user.data.user?.id)
        .order("id", {ascending: false});

    if (error) {
        console.error("Error loading recipes:", error);
        return <p>Failed to load recipes</p>;
    }

    const userRecipes: UserRecipe[] =
        data?.map((r) =>
            ({
            id: r.id,
            title: r.title,
            imageUrl: r.image_path || null,
        })) ?? [];

    userRecipes.forEach(row => {
        if (!row.imageUrl) return;
        const {data} = supabase.storage
            .from("recipe-images")
            .getPublicUrl(row.imageUrl);
        row.imageUrl = data.publicUrl;
    })

    return (
        <main className="p-6">
            <h4 className="text-5xl font-bold mb-5 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Your Generated Recipes
            </h4>

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