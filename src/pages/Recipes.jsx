import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Recipes = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Recipes");
  const [search, setSearch] = useState("");

  const toggleFavorite = (e, id) => {
    e.stopPropagation(); // ✅ Prevent card click
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const recipes = [
    {
      id: 1,
      title: "Paleo Steak with Asparagus",
      time: "40 min",
      servings: "2 servings",
      calories: "600 kcal",
      protein: "50g protein",
      carbs: "8g carbs",
      tags: ["PALEO", "HIGH PROTEIN"],
      image:
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141"
    }
  ];

  // ✅ Filter Logic
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      selectedFilter === "All Recipes" ||
      recipe.tags.includes(selectedFilter.toUpperCase());

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 bg-gray-50 min-h-screen px-6">
        <div className="max-w-6xl mx-auto">

          {/* SEARCH + FILTER */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 px-6 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none"
            />

            <div className="flex gap-3 flex-wrap">
              {["All Recipes", "High Protein", "Low Carb"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    selectedFilter === filter
                      ? "bg-blue-900 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

          </div>

          {/* RECIPE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => navigate(`/recipe/${recipe.id}`)} // ✅ Navigate
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
              >

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-60 object-cover"
                  />

                  <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    Molecular Match High
                  </span>

                  <button
                    onClick={(e) => toggleFavorite(e, recipe.id)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
                  >
                    {favorites.includes(recipe.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h2 className="text-lg font-semibold">
                    {recipe.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    {recipe.time} • {recipe.servings}
                  </p>

                  <div className="mt-4 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-700">
                    {recipe.calories} • {recipe.protein} • {recipe.carbs}
                  </div>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Added to Plan!");
                    }}
                    className="mt-6 w-full border border-orange-500 text-orange-500 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition"
                  >
                    Add to Plan
                  </button>

                </div>
              </div>
            ))}

          </div>

          {/* Empty State */}
          {filteredRecipes.length === 0 && (
            <div className="text-center mt-20 text-gray-500">
              No recipes found.
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Recipes;
