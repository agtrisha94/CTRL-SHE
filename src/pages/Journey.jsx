import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Journey = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Fitness & Performance",
      description:
        "Workout-synced meals, high-protein recipes, energy optimization.",
      color: "bg-orange-500",
      route: "/diet"
    },
    {
      title: "Health Conditions",
      description:
        "Medical condition-specific plans for diabetes, PCOD, hypertension & more.",
      color: "bg-green-600",
      route: "/diet"
    },
    {
      title: "Smart Grocery Bundles",
      description:
        "Pre-curated ingredient kits delivered via Blinkit & Swiggy.",
      color: "bg-blue-700",
      route: "/diet"
    }
  ];

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 bg-gray-50 min-h-screen px-6">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose Your Journey
          </h1>

          <div className="space-y-6">

            {options.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.route)}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex justify-between items-center"
              >
                <div className="flex items-start gap-6">

                  <div
                    className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold`}
                  >
                    →
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="text-gray-400 text-2xl">
                  →
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
};

export default Journey;
