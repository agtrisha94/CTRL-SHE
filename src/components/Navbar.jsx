import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [hasStarted, setHasStarted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      localStorage.setItem("hasStarted", "true");
    }
    setHasStarted(localStorage.getItem("hasStarted") === "true");
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

const steps = [
  { path: "/get-started", label: "Profile", step: 1 },
  { path: "/journey", label: "Journey", step: 2 },
  { path: "/plan-type", label: "Plan", step: 3 },
  { path: "/diet-plan", label: "Diet", step: 4 },
  { path: "/recipes", label: "Recipes", step: 5 },
  { path: "/smart-cart", label: "Cart", step: 6 }
];

  const currentStepIndex = steps.findIndex((step) =>
    location.pathname.startsWith(step.path)
  );

  const isOnboarding = currentStepIndex !== -1;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-[#fdfaf6]/95 backdrop-blur-xl shadow-sm border-b border-orange-100 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-6">

            {!isHome && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition group"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-sm font-medium">Back</span>
              </button>
            )}

            <Link
              to="/"
              className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
            >
              NutriMolecular
            </Link>
          </div>

          {/* CENTER (HOME ONLY) */}
          {isHome && (
            <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
              {[
                { name: "Features", id: "features" },
                { name: "How It Works", id: "how-it-works" },
                { name: "Pricing", id: "pricing" },
                { name: "About", id: "about" }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="relative hover:text-orange-500 transition"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 hover:w-full"></span>
                </a>
              ))}
            </div>
          )}

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* GET STARTED */}
            {isHome && !hasStarted && (
              <Link
                to="/get-started"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all duration-200"
              >
                Get Started →
              </Link>
            )}

            {/* STEP INDICATOR */}
            {isOnboarding && (
              <div className="hidden md:flex items-center gap-3">
                {steps.map((step, index) => {
                  const isActive = index === currentStepIndex;
                  const isCompleted = index < currentStepIndex;

                  return (
                    <div key={step.path} className="flex items-center">

                      {index > 0 && (
                        <div
                          className={`w-8 h-[2px] ${
                            isCompleted
                              ? "bg-gradient-to-r from-orange-500 to-orange-400"
                              : "bg-orange-100"
                          }`}
                        />
                      )}

                      <Link
                        to={step.path}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md ring-4 ring-orange-200"
                            : isCompleted
                            ? "bg-orange-100 text-orange-600"
                            : "bg-white border border-orange-100 text-gray-400"
                        }`}
                      >
                        {step.step}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CART ICON */}
            {(location.pathname === "/recipes" ||
              location.pathname === "/diet-plan") && (
              <Link
                to="/smart-cart"
                className="relative p-2 rounded-lg hover:bg-orange-50 transition"
              >
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-orange-500 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center shadow">
                  0
                </span>
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
