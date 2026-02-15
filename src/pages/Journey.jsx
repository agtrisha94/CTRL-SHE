import { useEffect, useState } from "react";
import { Flame, Activity, HeartPulse, Apple } from "lucide-react";

const NutritionDashboard = () => {
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const MacroPill = ({ label, value }) => (
    <div className="px-3 py-1.5 rounded-full bg-gray-100 text-sm">
      <span className="text-gray-500 mr-1">{label}:</span>
      <span className="font-medium text-gray-700">{value}</span>
    </div>
  );

  const CalorieRing = ({ calories }) => {
    const radius = 26;
    const stroke = 5;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const progress = Math.min(calories / 800, 1);
    const strokeDashoffset = circumference - progress * circumference;

    return (
      <div className="relative w-16 h-16">
        <svg height="64" width="64">
          <circle
            stroke="#f3f4f6"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="32"
            cy="32"
          />

          <circle
            stroke="#f97316"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{
              strokeDashoffset,
              transition: "stroke-dashoffset 0.6s ease",
            }}
            r={normalizedRadius}
            cx="32"
            cy="32"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500">kcal</span>
          <span className="text-sm font-semibold text-orange-500">
            {calories}
          </span>
        </div>
      </div>
    );
  };

  const getBmiInsight = (category) => {
    switch (category) {
      case "Underweight":
        return "Below the optimal weight range";
      case "Normal":
        return "Within a healthy weight range";
      case "Overweight":
        return "Above the recommended range";
      case "Obese":
        return "Elevated BMI — health optimization advised";
      default:
        return category;
    }
  };

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const res = await fetch(
          "https://ctrl-she.onrender.com/nutrition/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem(
                "access_token"
              )}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch nutrition");

        const data = await res.json();
        setNutrition(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNutrition();
  }, []);

  if (loading)
    return <div className="p-10 text-center text-gray-500">Loading...</div>;

  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;

  const { bmi, bmr, tdee, baseCalories, proteinG, carbsG, fatsG, bmiCategory } =
    nutrition;

  const mealWeights = {
    Breakfast: 0.3,
    Lunch: 0.3,
    Snack: 0.1,
    Dinner: 0.3,
  };

  const meals = Object.keys(mealWeights).map((meal) => ({
    meal,
    calories: Math.round(baseCalories * mealWeights[meal]),
    protein: Math.round(proteinG * mealWeights[meal]),
    carbs: Math.round(carbsG * mealWeights[meal]),
    fats: Math.round(fatsG * mealWeights[meal]),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-24 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HERO PANEL */}
        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Your Nutrition Snapshot
              </h1>
              <p className="text-gray-500 mt-2">
                Personalized metabolic insights & calorie guidance
              </p>

              <div className="mt-5 inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                <Activity size={16} />
                {getBmiInsight(bmiCategory)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-400 text-white rounded-2xl px-6 py-5 shadow-md">
              <p className="text-sm opacity-80">Daily Target</p>
              <p className="text-2xl font-bold">{baseCalories} kcal</p>
              <p className="text-xs opacity-70 mt-1">
                Optimized for your goal
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <StatCard icon={Activity} label="BMI" value={bmi} />
            <StatCard icon={HeartPulse} label="BMR" value={`${bmr} kcal`} />
            <StatCard icon={Flame} label="TDEE" value={`${tdee} kcal`} />
            <StatCard icon={Apple} label="Calories" value={`${baseCalories} kcal`} />
          </div>
        </div>

        {/* MACROS */}
        <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6">
          <h2 className="text-xl font-semibold mb-5">Daily Macros</h2>

          <MacroRow label="Protein" value={proteinG} />
          <MacroRow label="Carbs" value={carbsG} />
          <MacroRow label="Fats" value={fatsG} />
        </div>

        {/* MEALS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Per Meal Breakdown</h2>

          <div className="grid md:grid-cols-2 gap-5">
            {meals.map((meal) => (
              <div
                key={meal.meal}
                className="bg-white rounded-3xl shadow-sm border border-orange-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{meal.meal}</h3>
                    <p className="text-sm text-gray-500">Macro Split</p>
                  </div>

                  <CalorieRing calories={meal.calories} />
                </div>

                <div className="h-px bg-gray-100 my-4" />

                <div className="flex gap-2 flex-wrap">
                  <MacroPill label="Protein" value={`${meal.protein}g`} />
                  <MacroPill label="Carbs" value={`${meal.carbs}g`} />
                  <MacroPill label="Fats" value={`${meal.fats}g`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* COMPONENTS */

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-4 hover:shadow-md transition">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-orange-100 rounded-xl">
        <Icon size={18} className="text-orange-500" />
      </div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const MacroRow = ({ label, value }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}g</span>
    </div>

    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-orange-500 rounded-full transition-all"
        style={{ width: `${Math.min(value / 2, 100)}%` }}
      />
    </div>
  </div>
);

export default NutritionDashboard;
