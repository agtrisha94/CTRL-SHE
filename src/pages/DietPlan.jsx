import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Flame,
  Leaf,
  Drumstick,
  Dumbbell,
  Salad,
  Scale
} from "lucide-react";

const DietPlan = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const diets = [
    {
      name: "Keto",
      desc: "Low carb, high fat",
      icon: Flame
    },
    {
      name: "Vegan",
      desc: "Plant-based only",
      icon: Leaf
    },
    {
      name: "Paleo",
      desc: "Whole foods, no grains",
      icon: Drumstick
    },
    {
      name: "High-Protein",
      desc: "Muscle building focus",
      icon: Dumbbell
    },
    {
      name: "Mediterranean",
      desc: "Heart-healthy fats",
      icon: Salad
    },
    {
      name: "Balanced",
      desc: "All macros included",
      icon: Scale
    }
  ];

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-32 pb-28 px-6">

        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Select Your Diet Plan
            </h1>
            <p className="text-gray-600">
              We’ll curate recipes aligned with your nutrition goals.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {diets.map((diet) => {
              const isActive = selected === diet.name;
              const Icon = diet.icon;

              return (
                <div
                  key={diet.name}
                  onClick={() => setSelected(diet.name)}
                  className={`
                    relative cursor-pointer p-10 rounded-3xl border transition-all duration-300
                    backdrop-blur-sm
                    ${
                      isActive
                        ? "border-orange-500 bg-white shadow-[0_20px_50px_rgba(255,115,0,0.15)] scale-[1.03]"
                        : "border-orange-100 bg-white/80 hover:shadow-lg hover:-translate-y-1"
                    }
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "bg-orange-100 text-orange-500"
                      }
                    `}
                  >
                    <Icon size={26} />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {diet.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm">
                    {diet.desc}
                  </p>

                  {/* Selected Badge */}
                  {isActive && (
                    <div className="absolute top-6 right-6 text-xs font-medium bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                      Selected
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <button
              disabled={!selected}
              onClick={() => navigate("/recipes")}
              className={`
                px-14 py-4 rounded-xl font-semibold transition-all duration-300
                ${
                  selected
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:shadow-2xl hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
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
