import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ClipboardList, HeartPulse } from "lucide-react";

const planOptions = [
  {
    id: "normal",
    title: "Smart Recipes",
    description:
      "AI-recommended meals tailored to your preferences and molecular flavor compatibility.",
    icon: Sparkles
  },
  {
    id: "structured",
    title: "Structured Diet Plan",
    description:
      "Daily calorie-targeted meal plans aligned with your fitness and body goals.",
    icon: ClipboardList
  },
  {
    id: "condition",
    title: "Condition-Specific Plan",
    description:
      "Medical condition-aware nutrition for diabetes, PCOD, hypertension & more.",
    icon: HeartPulse
  }
];

const PlanType = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;

    localStorage.setItem("planType", selected);
    navigate("/diet-plan");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-32 pb-24 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Nutrition Strategy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select how NutriMolecular should build your personalized meal intelligence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {planOptions.map((option) => {
            const isActive = selected === option.id;
            const Icon = option.icon;

            return (
              <div
                key={option.id}
                onClick={() => setSelected(option.id)}
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {option.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {option.description}
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
