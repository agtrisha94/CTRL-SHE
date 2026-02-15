import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Heart, Search, RefreshCw } from "lucide-react";

import { fetchUserProfile } from "../services/userService";
import { fetchIndianRecipes, refreshRecipesCache } from "../services/cosylabService";

const FAVORITES_KEY = "favoriteRecipes";

const Recipes = () => {
  const navigate = useNavigate();
  const planType = localStorage.getItem("planType") || "normal";

  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Recipes");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Restore favorites from storage
  useEffect(() => {
    const storedFavs = localStorage.getItem(FAVORITES_KEY);
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  // ✅ Persist favorites
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ✅ FETCH FROM DB + n8n (with cache)
  useEffect(() => {
    const controller = new AbortController();

    const loadRecipes = async () => {
      try {
        setLoading(true);

        const user = await fetchUserProfile({
          signal: controller.signal,
        });

        const recipesData = await fetchIndianRecipes(user, {
          signal: controller.signal,
        });

        setRecipes(recipesData);
      } catch (err) {
        console.error("Recipe load error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (planType === "normal") {
      loadRecipes();
    } else {
      setRecipes([]);
      setLoading(false);
    }

    return () => controller.abort();
  }, [planType]);

  // ✅ SEARCH + FILTER
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      selectedFilter === "All Recipes" ||
      recipe.title
        .toUpperCase()
        .includes(selectedFilter.toUpperCase());

    return matchesSearch && matchesFilter;
  });

  const modeLabels = {
    normal: "Explore & Cook",
    structured: "Quick Daily Meals",
    condition: "Health-Focused Plan",
  };

  const handleRefresh = () => {
    refreshRecipesCache();
    window.location.reload();
  };

  if (loading)
    return (
      <>
        <Navbar />
        <div className="pt-32 text-center text-gray-500">
          Loading personalized recipes...
        </div>
      </>
    );

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-24 min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                AI Curated Recipes
              </h1>

              <p className="text-gray-600">
                Personalized molecular pairings aligned with your diet strategy.
              </p>

              <p className="text-sm text-orange-600 mt-2">
                Mode: <strong>{modeLabels[planType]}</strong>
              </p>
            </div>

            {/* ✅ Refresh Button */}
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-orange-200 hover:bg-orange-50 transition"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-96 mb-10">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-3 rounded-xl border border-orange-100 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Grid */}
          {filteredRecipes.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No recipes found 🍽️
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  className="group bg-white rounded-3xl border border-orange-100 overflow-hidden transition hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-64 object-cover"
                    />

                    <button
                      onClick={(e) => toggleFavorite(e, recipe.id)}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                    >
                      <Heart
                        size={18}
                        className={
                          favorites.includes(recipe.id)
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  </div>

                  <div className="p-6">
                    <h2 className="text-lg font-semibold">
                      {recipe.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {recipe.time}
                    </p>

                    <div className="mt-3 text-xs text-orange-600">
                      {recipe.tags.join(" • ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Recipes;
