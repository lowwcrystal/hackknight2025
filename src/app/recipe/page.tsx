import Recipe from "../components/Recipe";

export default async function Page() {
  return (
    <section className="w-screen max-w-none mb-16 pt-20 px-6 sm:px-10">
      {/* Title */}
      <h2 className="text-5xl font-bold mb-10 pl-6 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
        Dashboard
      </h2>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <Recipe /><Recipe /><Recipe /><Recipe /><Recipe /><Recipe /><Recipe />
      </div>
    </section>
  );
}
