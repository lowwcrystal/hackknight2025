"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import "./globals.css";
import {createClient} from "@/utils/supabase/client";

export default function Home() {
    const [meat, setMeat] = useState("");
    const [veggies, setVeggies] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const supabase = await createClient();
        const {data: {session}} = await supabase.auth.getSession();
        const user_id = session?.user?.id;

        try {
            const ingredients = [meat, veggies].filter(Boolean);

            const res = await fetch("/api/generate-recipe", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ingredients,
                    cuisine,
                    user_id
                }),
            });

            if (!res.ok) {
                console.error("Recipe generation failed");
                setLoading(false);
                return;
            }

            // backend should now return the recipe ID
            const data = await res.json();
            const recipeId = data.id;

            if (!recipeId) {
                console.error("No recipe ID returned");
                setLoading(false);
                return;
            }

            // redirect to recipe page
            router.push(`/recipes/${recipeId}`);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="font-sans text-black bg-gradient-to-b from-white via-orange-50 to-white min-h-screen flex flex-col">
            <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                    Turn the heat up!
                </h2>
                <p className="text-gray-700 mb-8 max-w-xl">
                    Tell us what’s in your dish, and Flame On will generate a personalized recipe! 🍽️
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-orange-200 flex flex-col gap-6 w-full max-w-md mb-10"
                    id="upload"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="meat" className="text-lg font-semibold text-orange-600">
                            Type of Meat
                        </label>
                        <input
                            id="meat"
                            type="text"
                            value={meat}
                            onChange={(e) => setMeat(e.target.value)}
                            placeholder="Chicken, Beef, Pork..."
                            disabled={loading}
                            className="bg-white border border-orange-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-60"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="veggies" className="text-lg font-semibold text-orange-600">
                            Type of Vegetables
                        </label>
                        <input
                            id="veggies"
                            type="text"
                            value={veggies}
                            onChange={(e) => setVeggies(e.target.value)}
                            placeholder="Broccoli, Carrots, Spinach..."
                            disabled={loading}
                            className="bg-white border border-orange-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-60"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="cuisine" className="text-lg font-semibold text-orange-600">
                            Cuisine Type
                        </label>
                        <input
                            id="cuisine"
                            type="text"
                            value={cuisine}
                            onChange={(e) => setCuisine(e.target.value)}
                            placeholder="Chinese, Italian, Vietnamese..."
                            disabled={loading}
                            className="bg-white border border-orange-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-60"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`${
                            loading
                                ? "bg-orange-300 cursor-not-allowed"
                                : "bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 hover:scale-105 hover:brightness-110"
                        } text-white font-bold py-2 rounded-full mt-4 transition-transform shadow-[0_0_10px_rgba(255,150,0,0.4)]`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span
                                    className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                Generating...
                            </span>
                        ) : (
                            "🔥 Submit"
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
}
