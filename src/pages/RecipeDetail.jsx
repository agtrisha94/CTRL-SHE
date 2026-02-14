import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Share2, Heart } from "lucide-react";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("ingredients");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const recipe = {
    title: "Paleo Steak with Asparagus",
    description: "Savory profile you'll love.",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    ingredients: [
      "500g Chicken Breast",
      "2 tbsp Olive Oil",
      "1 tsp Rosemary (Fresh)",
      "3 cloves Garlic",
      "1/2 Lemon"
    ],
    instructions: [
      "Preheat the pan over medium heat.",
      "Season the steak with salt and pepper.",
      "Cook each side for 4–5 minutes.",
      "Add rosemary and garlic during final minute.",
      "Let rest before serving."
    ]
  };

  const toggleIngredient = (item) => {
    setSelectedIngredients((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleAddToCart = () => {
    const itemsToAdd =
      selectedIngredients.length > 0
        ? selectedIngredients
        : recipe.ingredients;

    console.log("Adding to cart:", itemsToAdd);
    navigate("/smart-cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">

      {/* HERO */}
      <div className="relative h-[320px] md:h-[420px] lg:h-[480px] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        {/* Controls */}
        <div className="absolute top-6 left-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md flex items-center gap-2 hover:scale-105 transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="absolute top-6 right-6 flex gap-3">
          <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-md hover:scale-110 transition">
            <Share2 size={18} />
          </button>
          <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-md hover:scale-110 transition">
            <Heart size={18} />
          </button>
        </div>

        {/* Title */}
        <div className="absolute bottom-8 left-6 md:left-12 text-white max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {recipe.title}
          </h1>
          <p className="mt-3 text-white/90 text-sm md:text-base">
            {recipe.description}
          </p>
        </div>
      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-20 pb-40">

        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6 md:p-10">

          {/* Tabs */}
          <div className="flex overflow-x-auto gap-8 border-b border-orange-100 mb-8">
            {["ingredients", "instructions", "flavor"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 whitespace-nowrap text-sm font-semibold uppercase tracking-wide transition ${
                    isActive
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === "flavor" ? "Flavor Network" : tab}
                </button>
              );
            })}
          </div>

          {/* INGREDIENTS */}
          {activeTab === "ingredients" && (
            <div className="space-y-4">
              {recipe.ingredients.map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center bg-orange-50/60 border border-orange-100 px-5 py-4 rounded-2xl hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(item)}
                      onChange={() => toggleIngredient(item)}
                      className="w-5 h-5 accent-orange-500"
                    />
                    <span className="font-medium text-gray-800">
                      {item}
                    </span>
                  </div>

                  <button className="text-orange-500 text-sm font-semibold hover:underline">
                    Swap
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* INSTRUCTIONS */}
          {activeTab === "instructions" && (
            <div className="space-y-6">
              {recipe.instructions.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-5 bg-white border border-orange-100 p-5 rounded-2xl shadow-sm"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* FLAVOR */}
          {activeTab === "flavor" && (
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-gray-600">
              Flavor network visualization will be rendered here
              using D3.js or backend-provided data.
            </div>
          )}

        </div>
      </div>

      {/* STICKY BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Add Selected to Smart Cart 🛒
          </button>
        </div>
      </div>

    </div>
  );
};

export default RecipeDetail;
