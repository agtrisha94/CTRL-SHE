import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("ingredients");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // This will later come from backend
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
    navigate("/cart");

  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">

      {/* HERO */}
      <div className="relative h-[350px] md:h-[450px]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-6 left-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow"
          >
            ← Back
          </button>
        </div>

        <div className="absolute top-6 right-6 flex gap-3">
          <button className="bg-white/80 px-4 py-2 rounded-full shadow">
            🔗
          </button>
          <button className="bg-white/80 px-4 py-2 rounded-full shadow">
            ❤️
          </button>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto bg-white -mt-16 rounded-3xl shadow-xl p-8 relative z-10">

        <h1 className="text-3xl font-bold">
          {recipe.title}
        </h1>

        <p className="text-gray-500 mt-2">
          {recipe.description}
        </p>

        {/* TABS */}
        <div className="flex gap-8 border-b mt-8 mb-8">
          {["ingredients", "instructions", "flavor"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize transition ${
                activeTab === tab
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-400"
              }`}
            >
              {tab === "flavor" ? "Flavor Network" : tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}

        {activeTab === "ingredients" && (
          <div className="space-y-4">
            {recipe.ingredients.map((item) => (
              <div
                key={item}
                className="flex justify-between items-center bg-gray-50 px-6 py-4 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(item)}
                    onChange={() => toggleIngredient(item)}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <span>{item}</span>
                </div>

                <button className="text-orange-500 font-medium hover:underline">
                  Swap
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "instructions" && (
          <div className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 bg-gray-50 p-6 rounded-xl"
              >
                <div className="text-orange-500 font-bold">
                  {index + 1}.
                </div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "flavor" && (
          <div className="text-gray-500">
            <p>
              Flavor network visualization will be rendered here
              using D3.js or backend-provided data.
            </p>
          </div>
        )}
      </div>

      {/* STICKY ADD TO CART */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-4 rounded-xl font-semibold hover:scale-105 active:scale-95 transition"
          >
            Add All to Smart Cart 🛒
          </button>
        </div>
      </div>

    </div>
  );
};

export default RecipeDetail;
