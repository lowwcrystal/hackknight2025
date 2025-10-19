import {createClient} from "@/utils/supabase/server";
import RecipeCard from "../../components/RecipeCard";
import UserAttempts from "../../components/UserAttempts";
import { Suspense } from "react";

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
            <div
                key={id}
                rel="noopener noreferrer"
                className="overflow-hidden block"
            >
                <div className="p-4">
                    <h4 className="text-5xl font-bold mb-5 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                        Your Attempts
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
                        <a
                            href={`${id}/evaluator`}
                            className="bg-gradient-to-b from-yellow-100 to-orange-50 rounded-xl shadow-md border border-orange-200 p-0 overflow-hidden">
                            <div className="bg-orange-500 text-white text-lg font-semibold py-25 text-center">
                                +
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
