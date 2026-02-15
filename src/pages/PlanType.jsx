import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ClipboardList, HeartPulse } from "lucide-react";

const planOptions = [
  {
    id: "normal",
    title: "Explore & Cook",
    subtitle: "For cooking enthusiasts",
    description:
      "Browse all recipes and discover meals based on your taste, ingredients, and molecular flavor pairings. Perfect for users who love cooking.",
    icon: Sparkles,
  },
  {
    id: "structured",
    title: "Quick Daily Meals",
    subtitle: "For busy lifestyles",
    description:
      "Simple, ready-to-follow meal plans designed for office-goers, students, and anyone needing fast, balanced nutrition.",
    icon: ClipboardList,
  },
  {
    id: "condition",
    title: "Health-Focused Plan",
    subtitle: "For medical & wellness needs",
    description:
      "Personalized nutrition tailored to your health conditions like diabetes, PCOD, thyroid, hypertension, and more.",
    icon: HeartPulse,
  },
];

const PlanType = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // ✅ Load saved preference on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem("planType");
    if (savedPlan) {
      setSelected(savedPlan);
    }
  }, []);

  const handleContinue = () => {
    if (!selected) return;

    // ✅ Save only if changed (cleaner)
    const existing = localStorage.getItem("planType");
    if (existing !== selected) {
      localStorage.setItem("planType", selected);
    }

    navigate("/recipes");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How should we plan your meals?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the experience that best fits your lifestyle and nutrition
            goals.
          </p>

          {/* ✅ Persistence hint */}
          {selected && (
            <p className="text-sm text-orange-600 mt-4">
              Your meal planning mode is saved. You can change it anytime.
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {planOptions.map((option) => {
            const isActive = selected === option.id;
            const Icon = option.icon;

            return (
              <motion.div
                key={option.id}
                onClick={() => setSelected(option.id)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative cursor-pointer p-10 rounded-3xl border transition-all duration-300
                  backdrop-blur-sm
                  ${
                    isActive
                      ? "border-orange-500 bg-white shadow-[0_20px_50px_rgba(255,115,0,0.15)] scale-[1.03]"
                      : "border-orange-100 bg-white/80 hover:shadow-xl hover:border-orange-300"
                  }
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all
                    ${
                      isActive
                        ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg"
                        : "bg-orange-100 text-orange-500"
                    }
                  `}
                >
                  <Icon size={26} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {option.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-orange-500 font-medium mb-3">
                  {option.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {option.description}
                </p>

                {/* Selected Badge */}
                {isActive && (
                  <div className="absolute top-6 right-6 text-xs font-medium bg-orange-500 text-white px-3 py-1 rounded-full shadow-md">
                    ✓ Selected
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="mt-16 text-center">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`
              px-12 py-4 rounded-xl font-semibold transition-all duration-300
              ${
                selected
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:shadow-2xl hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Continue →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlanType;
