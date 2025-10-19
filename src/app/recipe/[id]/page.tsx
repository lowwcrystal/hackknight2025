import {createClient} from "@/utils/supabase/server";
import RecipeCard from "../../components/RecipeCard";
import UserAttempts from "../../components/UserAttempts";
import {Suspense} from "react";

interface RecipeRow {
    id: string;
    content: string;
    tags: string[];
    image_path: string;
}

export default async function RecipePage({params,}: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params;
    const supabase = await createClient();
    const {data: row, error} = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single<RecipeRow>();

    if (error) {
        console.error("Error loading recipe:", error);
        return <p>Failed to load recipe</p>;
    }

    if (!row) {
        return <div>Recipe not found</div>;
    }

    const {data} = supabase.storage
        .from("recipe-images")
        .getPublicUrl(row.image_path);

    return (
        <section className="max-w-none mb-16 pt-5 px-6 sm:px-5">
            <RecipeCard id={id} recipe={JSON.parse(row.content)} tags={row.tags} imageUrl={data.publicUrl}/>

            <Suspense fallback={<div className="p-4">Loading attempts...</div>}>
                <UserAttempts recipeId={id} />
            </Suspense>
        </section>
    );
}
