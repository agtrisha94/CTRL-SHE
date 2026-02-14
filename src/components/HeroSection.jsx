import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  TrendingUp,
  Brain,
  Heart,
  ChevronRight
} from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/get-started"); // ✅ MATCHED TO YOUR ROUTER
  };

  const handleSeeJourney = () => {
    navigate("/journey"); // ✅ MATCHED TO YOUR ROUTER
  };

  const stats = [
    { icon: TrendingUp, value: "30%", label: "Better Adherence" },
    { icon: Brain, value: "10k+", label: "AI-Optimized Recipes" },
    { icon: Sparkles, value: "50M+", label: "Flavor Compounds" },
    { icon: Heart, value: "50+", label: "Health Conditions Supported" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#faf6f1] via-[#fffaf5] to-[#fdf4ec] px-6 py-20">

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-orange-300/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -100, 60, 0], y: [0, 100, -50, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-orange-400/15 rounded-full blur-[140px]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-orange-100 shadow-[0_2px_20px_rgba(249,115,22,0.08)] mb-8"
        >
          <Sparkles className="w-4 h-4 text-orange-500 mr-2" />
          <span className="text-sm font-semibold text-gray-700 tracking-wide">
            AI-Powered Molecular Nutrition Platform
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900 mb-6"
        >
          Nutrition Engineered
          <br />
          <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
            Through Molecular Science
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          AI-driven flavor pairing combined with metabolic intelligence
          to improve adherence by{" "}
          <span className="text-orange-600 font-bold">30%</span>.
          Personalized nutrition built for long-term success.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 flex justify-center gap-4 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            Start Your Journey
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSeeJourney}
            className="px-8 py-4 bg-white text-orange-600 border border-orange-200 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            See How It Works
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.03 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 shadow-[0_4px_20px_rgba(249,115,22,0.06)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)] transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
