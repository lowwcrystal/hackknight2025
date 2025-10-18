export default function Recipe() {
    return (
        {/* Attempt Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                <RecipeAttempt /><RecipeAttempt /><RecipeAttempt /><RecipeAttempt />
              </div>
    );
}