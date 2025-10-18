import {createClient} from "@/utils/supabase/server";
import {UserRecipe} from "@/types/userRecipe";
import Link from "next/link";
import Image from "next/image";

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
        data?.map((r) => ({
            id: r.id,
            title: r.title,
            imageUrl: r.image_path || null,
        })) ?? [];

    return (
        <main className="p-6">
            <h1 className="text-2xl font-semibold mb-6">
                Your Generated Recipes
            </h1>

            {userRecipes.length === 0 ? (
                <p>No recipes found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {userRecipes.map((recipe, i) => (
                        <Link
                            key={i}
                            href={`/recipe/${recipe.id}`}
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition block"
                        >
                            {recipe.imageUrl ? (
                                <Image
                                    src={recipe.imageUrl}
                                    alt={recipe.title}
                                    className="w-full h-40 object-cover"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}
                            <div className="p-3">
                                <h2 className="font-semibold text-lg truncate">
                                    {recipe.title}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
