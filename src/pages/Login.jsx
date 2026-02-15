import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }

        await registerUser(email, password);
        navigate("/get-started");
      } else {
        const { accessToken, profileCompleted, user } = await loginUser(
          email,
          password,
        );

        // ✅ Safety guard
        if (!accessToken) {
          throw new Error("Authentication failed");
        }

        // ❌ REMOVE THIS (handled by authService)
        // localStorage.setItem("token", accessToken);

        // ✅ Store user profile only
        if (user) {
          localStorage.setItem("userProfile", JSON.stringify(user));
        } else {
          localStorage.removeItem("userProfile");
        }

        if (profileCompleted) {
          navigate("/recipes");
        } else {
          navigate("/get-started");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf6f1] via-[#fffaf5] to-[#fdf4ec] flex items-center justify-center px-6">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -80, 40, 0], y: [0, 60, -30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] bg-purple-300/10 rounded-full blur-[140px]"
        />
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-orange-100/60 rounded-3xl shadow-xl p-8">
          {/* Logo / Badge */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-md mb-4">
              <Sparkles className="w-6 h-6" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>

            <p className="text-sm text-gray-600 mt-1">
              {isSignup
                ? "Start your personalized nutrition journey"
                : "Login to continue your journey"}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex bg-orange-50 rounded-full p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsSignup(false);
                setError("");
              }}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                !isSignup ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignup(true);
                setError("");
              }}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                isSignup ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                autoComplete="email"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400/40 bg-white/80 text-sm"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                autoComplete={isSignup ? "new-password" : "current-password"}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400/40 bg-white/80 text-sm"
              />
            </div>

            {/* Confirm Password */}
            <AnimatePresence>
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    autoComplete="new-password"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400/40 bg-white/80 text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Forgot Password */}
            {!isSignup && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full py-3 rounded-xl font-semibold shadow-md transition ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg"
              }`}
            >
              {loading
                ? "Please wait..."
                : isSignup
                ? "Create Account"
                : "Login"}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-6">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-orange-600 font-medium"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-orange-600 font-medium"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
