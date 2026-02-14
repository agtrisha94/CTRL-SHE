import { useState, useEffect } from "react";
import CTAButton from "./CTAButton";
import molecule from "../assets/molecule.png";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-gradient-to-br from-white via-orange-50 to-white">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT SIDE */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-md border border-orange-200">
              <div className="relative">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Personalized Molecular Recommender System
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900">Nutrition</span>
              <br />
              <span className="text-gray-900">Through</span>{" "}
              <span className="relative inline-block">
                <span className="text-orange-500">Molecular</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500/30 rounded-full" />
              </span>
              <br />
              <span className="text-gray-900">Science</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              AI-powered flavor pairing combined with health intelligence to
              improve diet adherence by{" "}
              <span className="text-orange-500 font-bold text-2xl">
                30%
              </span>
              . Experience nutrition like never before with personalized
              molecular recommendations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <CTAButton text="Start Your Journey" variant="primary" />
              <CTAButton text="Watch Demo" variant="secondary" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <p className="text-3xl font-bold text-orange-500">30%</p>
                <p className="text-sm text-gray-500">Better adherence</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">10k+</p>
                <p className="text-sm text-gray-500">Recipes analyzed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-800">50M+</p>
                <p className="text-sm text-gray-500">Flavor datapoints</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                HIPAA Compliant
              </span>

              <span className="w-px h-4 bg-gray-300" />

              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                FDA Registered
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-blue-600/20 rounded-3xl blur-2xl" />
              <img
                src={molecule}
                alt="Molecular Structure"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-bounce">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <span className="text-orange-500 font-bold">AI</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Analysis</p>
                  <p className="text-lg font-bold text-gray-900">
                    98% Accuracy
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
