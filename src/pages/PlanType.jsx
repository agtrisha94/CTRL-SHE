import { useState } from "react";
import { useNavigate } from "react-router-dom";

const planOptions = [
  {
    id: "normal",
    title: "Smart Recipes",
    description:
      "AI-recommended meals tailored to your preferences and molecular flavor compatibility.",
    icon: "🍽️"
  },
  {
    id: "structured",
    title: "Structured Diet Plan",
    description:
      "Daily calorie-targeted meal plans aligned with your fitness and body goals.",
    icon: "📊"
  },
  {
    id: "condition",
    title: "Condition-Specific Plan",
    description:
      "Medical condition-aware nutrition for diabetes, PCOD, hypertension & more.",
    icon: "🩺"
  }
];

const PlanType = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;

    // Later this can go to context or localStorage
    localStorage.setItem("planType", selected);

    navigate("/diet");
  };

  return (
    <section className="pt-28 pb-20 px-6 bg-gray-50 min-h-screen">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Choose Your Nutrition Strategy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select how you want NutriMolecular to build your meal intelligence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {planOptions.map((option) => {
            const isActive = selected === option.id;

            return (
              <div
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`cursor-pointer p-8 rounded-2xl transition-all duration-300 border 
                ${
                  isActive
                    ? "border-orange-500 shadow-xl scale-[1.02] bg-white"
                    : "border-gray-200 bg-white hover:shadow-lg"
                }`}
              >
                <div className="text-4xl mb-5">{option.icon}</div>

                <h3 className="text-xl font-semibold mb-3">
                  {option.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {option.description}
                </p>

                {isActive && (
                  <div className="mt-6 text-sm font-medium text-orange-500">
                    Selected ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="mt-14 text-center">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`px-10 py-4 rounded-xl font-semibold transition-all duration-300
            ${
              selected
                ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlanType;
