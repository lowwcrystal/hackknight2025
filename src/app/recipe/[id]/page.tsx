import type {Recipe} from "@/types/recipe";
import {createClient} from "@/utils/supabase/server";
import RecipeCard from "../../components/RecipeCard";

export default async function RecipePage({params,}: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params;
    const supabase = await createClient();
    const {data: recipe, error} = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single<Recipe>();

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <section className="w-screen max-w-none mb-16 pt-20 px-6 sm:px-10">
            {/* Title */}
            <h2 className="text-5xl font-bold mb-10 pl-6 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Recipe
            </h2>

            <RecipeCard recipe={recipe}/>
        </section>
    );
}
