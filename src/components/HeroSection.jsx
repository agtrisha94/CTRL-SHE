import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Brain,
  Heart,
  TrendingUp,
  ChevronRight
} from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/get-started"); // ✅ Matches your router
  };

  const stats = [
    { icon: Sparkles, value: "50M+", label: "Flavor Compounds", color: "text-orange-600" },
    { icon: TrendingUp, value: "30%", label: "Better Adherence", color: "text-green-600" },
    { icon: Brain, value: "10k+", label: "AI-Optimized Recipes", color: "text-purple-600" },
    { icon: Heart, value: "50+", label: "Health Conditions", color: "text-red-600" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf6f1] via-[#fffaf5] to-[#fdf4ec]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-6 py-20 md:py-32">

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-orange-300/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -100, 80, 0],
              y: [0, 100, -60, 0]
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
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-orange-100 shadow-[0_2px_20px_rgba(249,115,22,0.08)] mb-8"
          >
            <Sparkles className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm font-semibold text-gray-700 tracking-wide">
              The Science Behind Your Perfect Meal
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900 mb-6"
          >
            Your Journey to
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Molecular Nutrition
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From your first login to your perfectly paired meal—discover how AI,
            molecular science, and smart logistics work together to transform your nutrition.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10"
          >
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              Get Started Free
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 shadow-[0_4px_20px_rgba(249,115,22,0.06)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)] transition-all duration-300"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Architecture Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/30 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powered by Advanced Architecture
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enterprise-grade tech stack delivering molecular nutrition at scale
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Brain,
              title: "AI Layer",
              items: ["LangChain Pipelines", "OpenRouter LLM", "NLP Analysis", "Redis Caching"],
              color: "from-purple-400 to-purple-600"
            },
            {
              icon: Sparkles,
              title: "Molecular Engine",
              items: ["FlavorDB Integration", "Tanimoto Similarity", "14+ API Endpoints", "50M+ Compounds"],
              color: "from-blue-400 to-blue-600"
            },
            {
              icon: TrendingUp,
              title: "Backend Stack",
              items: ["NestJS Microservices", "Prisma ORM", "React/Expo Frontend", "D3.js Visualization"],
              color: "from-orange-400 to-orange-600"
            }
          ].map((tech, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-orange-100/50 shadow-[0_10px_40px_rgba(249,115,22,0.08)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)] transition-all duration-500"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} p-[2px] mb-6`}>
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                  <tech.icon className="w-8 h-8 text-gray-900" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{tech.title}</h3>
              <ul className="space-y-2">
                {tech.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HeroSection;
