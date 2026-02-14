import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Heart, Search } from "lucide-react";

const Recipes = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Recipes");
  const [search, setSearch] = useState("");

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
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

      <section className="pt-32 pb-24 min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              AI Curated Recipes
            </h1>
            <p className="text-gray-600">
              Personalized molecular pairings aligned with your diet strategy.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-14">

            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search recipes or ingredients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-orange-100 bg-white/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              {["All Recipes", "High Protein", "Low Carb"].map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-white border border-orange-100 text-gray-600 hover:border-orange-300"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                className="group bg-white/90 backdrop-blur-md rounded-3xl border border-orange-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-64 object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Badge */}
                  <span className="absolute top-5 left-5 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                    Molecular Match High
                  </span>

                  {/* Favorite */}
                  <button
                    onClick={(e) => toggleFavorite(e, recipe.id)}
                    className="absolute top-5 right-5 bg-white/90 backdrop-blur-md p-2 rounded-full shadow hover:scale-110 transition"
                  >
                    <Heart
                      size={18}
                      className={`transition ${
                        favorites.includes(recipe.id)
                          ? "fill-orange-500 text-orange-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-7">

                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {recipe.title}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {recipe.time} • {recipe.servings}
                  </p>

                  {/* Nutrition Pill */}
                  <div className="mt-5 bg-orange-50 text-gray-700 rounded-full px-5 py-2 text-sm font-medium inline-block">
                    {recipe.calories} • {recipe.protein} • {recipe.carbs}
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 mt-5 flex-wrap">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Added to Plan!");
                    }}
                    className="mt-8 w-full py-3 rounded-xl font-semibold border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    Add to Plan
                  </button>

                </div>
              </div>
            ))}

          </div>

          {/* Empty State */}
          {filteredRecipes.length === 0 && (
            <div className="text-center mt-24 text-gray-500">
              No recipes found.
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Recipes;
