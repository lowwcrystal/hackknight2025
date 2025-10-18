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

    if (error) {
        console.error("Error loading recipe:", error);
        return <p>Failed to load recipe</p>;
    }

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <section className="w-screen max-w-none mb-16 pt-5 px-6 sm:px-5">
            <RecipeCard recipe={recipe}/>
        </section>
    );
}
