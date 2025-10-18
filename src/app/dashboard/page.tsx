import Image from "next/image";
import LogoutButton from "@/app/components/LogoutButton";

export default async function DashboardPage() {
  // Placeholder recipes array (empty for now)
  const userRecipes: Array<{
    name?: string;
    meat?: string;
    veggies?: string;
    cuisine?: string;
    image?: string;
    link?: string;
  }> = []; // empty, will be populated by user input

  return (
    <main className="p-8 min-h-screen bg-gradient-to-b from-white via-orange-50 to-white">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Your Recipes</h1>
      <p className="text-gray-700 mb-6">Here’s where your uploaded recipes will appear! 🍽️</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userRecipes.length === 0 ? (
          // Placeholder empty boxes
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center h-48 border border-orange-200 animate-pulse"
            >
              <div className="w-16 h-16 bg-orange-200 rounded-full mb-2"></div>
              <div className="w-24 h-4 bg-orange-200 rounded mb-1"></div>
              <div className="w-16 h-3 bg-orange-200 rounded"></div>
            </div>
          ))
        ) : (
          userRecipes.map((recipe, idx) => (
            <a
              key={idx}
              href={recipe.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform block"
            >
              {recipe.image && (
                <div className="relative w-full h-32">
                  <Image
                    src={recipe.image}
                    alt={recipe.name || "Recipe"}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className="p-4">
                <h4 className="font-semibold text-lg text-gray-800">{recipe.name}</h4>
                <p className="text-sm text-gray-600">
                  {recipe.cuisine} | {recipe.meat} | {recipe.veggies}
                </p>
              </div>
            </a>
          ))
        )}
      </div>

      <div className="mt-8">
        <LogoutButton />
      </div>
    </main>
  );
}
