import { useNavigate } from "react-router-dom";
import { Dumbbell, HeartPulse, ShoppingCart, ArrowRight } from "lucide-react";

const Journey = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Fitness & Performance",
      description:
        "Workout-synced meals, high-protein recipes, energy optimization.",
      icon: Dumbbell,
      gradient: "from-orange-500 to-orange-600",
      route: "/diet-plan"
    },
    {
      title: "Health Conditions",
      description:
        "Medical condition-specific plans for diabetes, PCOD, hypertension & more.",
      icon: HeartPulse,
      gradient: "from-emerald-500 to-emerald-600",
      route: "/diet-plan"
    },
    {
      title: "Smart Grocery Bundles",
      description:
        "Pre-curated ingredient kits delivered via Blinkit & Swiggy.",
      icon: ShoppingCart,
      gradient: "from-blue-600 to-blue-700",
      route: "/diet-plan"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-32 pb-24 px-4 sm:px-6 lg:px-8">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Choose Your Journey
          </h1>
          <p className="text-gray-500 mt-3 text-sm">
            Select the path that aligns with your nutrition goals.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-6">

          {options.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                onClick={() => navigate(item.route)}
                className="group bg-white/80 backdrop-blur-md border border-orange-100 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1"
              >
                <div className="flex justify-between items-center">

                  <div className="flex items-start gap-6">

                    {/* Icon */}
                    <div
                      className={`bg-gradient-to-r ${item.gradient} w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition`}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Text */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-xl text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <div className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition">
                    <ArrowRight size={22} />
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Journey;
