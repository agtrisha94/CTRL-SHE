import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const DietPlan = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const diets = [
    { name: "Keto", desc: "Low carb, high fat", color: "text-orange-500" },
    { name: "Vegan", desc: "Plant-based only", color: "text-green-600" },
    { name: "Paleo", desc: "Whole foods, no grains", color: "text-red-500" },
    { name: "High-Protein", desc: "Muscle building focus", color: "text-blue-600" },
    { name: "Mediterranean", desc: "Heart-healthy fats", color: "text-cyan-600" },
    { name: "Balanced", desc: "All macros included", color: "text-purple-600" },
  ];

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-24 bg-gray-50 min-h-screen px-6">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Select Your Diet Plan
          </h1>

          <p className="text-gray-500 text-center mt-3 mb-12">
            We'll find recipes that match your goals.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {diets.map((diet) => (
              <div
                key={diet.name}
                onClick={() => setSelected(diet.name)}
                className={`p-8 rounded-2xl shadow-md cursor-pointer transition
                ${selected === diet.name
                    ? "bg-white border-2 border-orange-500 shadow-xl"
                    : "bg-white hover:shadow-xl"}
                `}
              >
                <div className={`text-3xl font-bold ${diet.color}`}>
                  ●
                </div>

                <h2 className="text-xl font-semibold mt-6">
                  {diet.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  {diet.desc}
                </p>
              </div>
            ))}

          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button
              disabled={!selected}
              onClick={() => navigate("/recipes")}
              className={`px-12 py-4 rounded-xl font-semibold transition
              ${selected
                  ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}
              `}
            >
              Show Me Recipes →
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default DietPlan;
