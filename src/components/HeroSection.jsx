import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, Heart, TrendingUp, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  const stats = [
    {
      icon: Sparkles,
      value: "50M+",
      label: "Food & Flavor Data Points",
      color: "text-orange-600",
    },
    {
      icon: TrendingUp,
      value: "30%",
      label: "Better Meal Consistency",
      color: "text-green-600",
    },
    {
      icon: Brain,
      value: "1000+",
      label: "Personalized Meal Combinations",
      color: "text-purple-600",
    },
    {
      icon: Heart,
      value: "50+",
      label: "Dietary & Health Needs Supported",
      color: "text-red-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf6f1] via-[#fffaf5] to-[#fdf4ec]">
      
      {/* HERO */}
      <section
        id="features"
        className="relative overflow-hidden px-6 pt-24 pb-20 md:pt-32 md:pb-28"
      >
        {/* Soft Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -60, 40, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-orange-300/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -90, 60, 0],
              y: [0, 80, -50, 0],
            }}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-200px] left-[-200px] w-[700px] h-[700px] bg-purple-400/15 rounded-full blur-[140px]"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-orange-100 shadow mb-10"
          >
            <Sparkles className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm font-semibold text-gray-700">
              Smart Meals for Every Body
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-gray-900 mb-6"
          >
            Any Meal. Any Person.
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Perfectly Personalized.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From fitness goals to medical needs to everyday healthy eating —
            FoodoFit builds meals around your body, preferences, and lifestyle.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              Start Your Journey
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/70 backdrop-blur-md text-gray-900 rounded-full font-semibold text-base md:text-lg border border-orange-100 shadow hover:bg-white transition"
            >
              Explore Recipes
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 max-w-4xl mx-auto"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-orange-100/50 shadow-sm hover:shadow-md transition"
              >
                <stat.icon
                  className={`w-7 h-7 md:w-8 md:h-8 ${stat.color} mx-auto mb-2`}
                />
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-100 to-transparent" />

      {/* USER JOURNEY */}
      <section
        id="how-it-works"
        className="relative px-6 py-24 text-gray-900 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-orange-300/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-amber-200/30 rounded-full blur-[140px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              How FlavorFit Works
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              A seamless journey powered by AI, nutrition science, and your
              preferences
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            
            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-300 via-orange-200 to-transparent md:hidden" />
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-300 to-transparent" />

            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-5 md:gap-6 md:items-stretch">
              {[
                {
                  step: "01",
                  title: "User Input",
                  desc: "Share dietary preferences, allergies, goals, and ingredient dislikes.",
                },
                {
                  step: "02",
                  title: "Diet Selection",
                  desc: "Choose between smart recipes, structured plans, or condition-specific nutrition.",
                },
                {
                  step: "03",
                  title: "Dietary Preference",
                  desc: "Select Keto, Vegan, High-Protein, Medical diets, and more.",
                },
                {
                  step: "04",
                  title: "Recipe Discovery",
                  desc: "Explore AI-matched meals optimized for taste & nutritional needs.",
                },
                {
                  step: "05",
                  title: "Smart Cart",
                  desc: "Instantly add ingredients to your cart with integrated suppliers.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="relative pl-12 md:pl-0 h-full"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-2 md:left-1/2 md:-translate-x-1/2 md:-top-6">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-orange-100">
                      {item.step}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="h-full flex flex-col bg-white/70 backdrop-blur-md border border-orange-100/60 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-500">
                    <h3 className="text-sm md:text-base font-semibold mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed mt-auto">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
