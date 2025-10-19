import RecipeAttempt from "../components/RecipeAttempt";

export default async function Page() {
    return (
        <section className="w-screen max-w-none mb-16 pt-20 px-6 sm:px-10">
              {/* Title */}
              <h2 className="text-5xl font-bold mb-10 pl-6 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Dashboard
              </h2>
        
              {/* Attempt Grid */}
              <div className="grid grid-cols-1">
                <RecipeAttempt id="1" title="Sample Recipe 1" />
                <RecipeAttempt id="2" title="Sample Recipe 2" />
                <RecipeAttempt id="3" title="Sample Recipe 3" />
                <RecipeAttempt id="4" title="Sample Recipe 4" />
              </div>
            </section>
    );
}