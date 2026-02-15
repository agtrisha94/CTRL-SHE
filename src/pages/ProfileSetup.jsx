import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Target, Utensils } from "lucide-react";
import { completeProfile } from "../services/userService";

import ProgressBar from "../components/form/ProgressBar";
import InputField from "../components/form/InputField";
import Chip from "../components/form/Chip";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "Male",
    goal: "Weight Loss",
    activityLevel: "sedentary",
    cuisine: "",
    foods: [],
    allergies: [],
    diseases: [],
  });

  // ---------------- TOGGLES ----------------

  const toggleFood = (item) => {
    setForm((prev) => ({
      ...prev,
      foods: prev.foods.includes(item)
        ? prev.foods.filter((f) => f !== item)
        : [...prev.foods, item],
    }));
  };

  const toggleDisease = (item) => {
    setForm((prev) => ({
      ...prev,
      diseases: prev.diseases.includes(item)
        ? prev.diseases.filter((d) => d !== item)
        : [...prev.diseases, item],
    }));
  };

  const toggleAllergy = (item) => {
    setForm((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(item)
        ? prev.allergies.filter((a) => a !== item)
        : [...prev.allergies, item],
    }));
  };

  // ---------------- DIET LOGIC ----------------

 const calculateDietType = (foods) => {
  const hasPlants = foods.includes("Plants & Vegetables");
  const hasDairy = foods.includes("Dairy");
  const hasEggs = foods.includes("Eggs");
  const hasSeafood = foods.includes("Seafood & Fish");
  const hasMeat = foods.includes("Meat");

  if (foods.length === 0) return null;

  if (hasMeat) return "NON_VEGETARIAN";

  if (hasSeafood && !hasMeat)
    return "PESCETARIAN";

  if (hasEggs && hasDairy)
    return "OVO_LACTO_VEGETARIAN";

  if (hasEggs)
    return "OVO_VEGETARIAN";

  if (hasDairy)
    return "LACTO_VEGETARIAN";

  if (hasPlants)
    return "VEGAN";

  return null;
};


  // ---------------- SUBMIT ----------------

  const handleContinue = async () => {
    if (
      !form.name ||
      !form.age ||
      !form.height ||
      !form.weight ||
      !form.cuisine
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const dietType = calculateDietType(form.foods);

      const payload = {
        name: form.name,
        age: Number(form.age),
        gender: form.gender.toUpperCase(),
        heightCm: Number(form.height),
        weightKg: Number(form.weight),

        activityLevel: form.activityLevel.toUpperCase(),
        goalType: form.goal.replace(" ", "_").toUpperCase(),

        dietType,
        country: "IN",
        defaultCuisine: form.cuisine,
        allergies: form.allergies,
        diseases: form.diseases,
      };

      await completeProfile(payload);

      navigate("/journey");
    } catch (err) {
      setError(err.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-orange-100 p-8 sm:p-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
              <User size={20} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Build Your Profile
            </h1>
          </div>

          <p className="text-gray-500 text-sm">
            Help us personalize your molecular nutrition journey.
          </p>

          <div className="mt-6">
            <ProgressBar step={1} total={3} />
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label="Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <InputField
            label="Age *"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />

          <InputField
            label="Height (cm) *"
            type="number"
            value={form.height}
            onChange={(e) => setForm({ ...form, height: e.target.value })}
          />

          <InputField
            label="Weight (kg) *"
            type="number"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />
        </div>

        {/* Gender */}
        <div className="mt-10">
          <label className="text-sm font-medium text-gray-700 mb-4 block">
            Gender
          </label>

          <div className="inline-flex bg-orange-50 border border-orange-100 rounded-xl p-1">
            {["Male", "Female", "Other"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setForm({ ...form, gender: g })}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                  form.gender === g
                    ? "bg-white shadow text-orange-600"
                    : "text-gray-500"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div className="mt-10">
          <label className="text-sm font-medium text-gray-700 mb-4 block">
            Goal
          </label>

          <select
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            className="w-full bg-orange-50 border border-orange-200 px-5 py-4 rounded-xl"
          >
            <option>Weight Loss</option>
            <option>Maintenance</option>
            <option>Muscle Gain</option>
          </select>
        </div>

        {/* Activity */}
        <div className="mt-10">
          <label className="text-sm font-medium text-gray-700 mb-4 block">
            Activity Level
          </label>

          <select
            value={form.activityLevel}
            onChange={(e) =>
              setForm({ ...form, activityLevel: e.target.value })
            }
            className="w-full bg-orange-50 border border-orange-200 px-5 py-4 rounded-xl"
          >
            <option value="sedentary">Sedentary</option>
            <option value="lightly_active">Lightly Active</option>
            <option value="moderately_active">Moderately Active</option>
            <option value="very_active">Very Active</option>
            <option value="athlete">Athlete</option>
          </select>
        </div>

        {/* Cuisine Preference */}
        <div className="mt-10">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
            <Utensils size={16} className="text-orange-500" />
            Cuisine Preference *
          </label>

          <div className="relative">
            <select
              value={form.cuisine}
              onChange={(e) => setForm({ ...form, cuisine: e.target.value })}
              className="w-full appearance-none bg-orange-50 border border-orange-200 px-5 py-4 rounded-xl"
            >
              <option value="">Select Cuisine</option>
              <option>Australian</option>
              <option>Belgian</option>
              <option>Canadian</option>
              <option>Caribbean</option>
              <option>Central American</option>
              <option>Chinese & Mongolian</option>
              <option>Deutschland</option>
              <option>Eastern European</option>
              <option>French</option>
              <option>Greek</option>
              <option>Indian Subcontinent</option>
              <option>Irish</option>
              <option>Italian</option>
              <option>Japanese</option>
              <option>Korean</option>
              <option>Mexican</option>
              <option>Middle Eastern</option>
              <option>Northern Africa</option>
              <option>Rest of Africa</option>
              <option>Scandinavian</option>
              <option>South American</option>
              <option>Southeast Asian</option>
              <option>Spanish & Portuguese</option>
              <option>Thai</option>
              <option>UK</option>
              <option>US</option>
            </select>
          </div>
        </div>

        {/* Foods */}
        <div className="mt-14 border-t border-orange-100 pt-10">
          <h2 className="text-lg font-semibold mb-4">Foods You Eat</h2>

          <div className="flex flex-wrap gap-3">
            {[
              "Eggs",
              "Dairy",
              "Seafood & Fish",
              "Meat",
              "Plants & Vegetables",
            ].map((item) => (
              <Chip
                key={item}
                label={item}
                selected={form.foods.includes(item)}
                onClick={() => toggleFood(item)}
              />
            ))}
          </div>

          {form.foods.length > 0 && (
            <p className="text-sm text-orange-600 mt-3">
              Diet detected:{" "}
              <strong>
                {calculateDietType(form.foods).replaceAll("_", " ")}
              </strong>
            </p>
          )}
        </div>

        {/* Diseases */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Health Conditions</h2>

          <div className="flex flex-wrap gap-3">
            {["Diabetes", "PCOS", "Thyroid"].map((item) => (
              <Chip
                key={item}
                label={item}
                selected={form.diseases.includes(item)}
                onClick={() => toggleDisease(item)}
              />
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">
            Allergies & Restrictions
          </h2>

          <div className="flex flex-wrap gap-3">
            {["Nuts", "Soy", "Eggs", "Shellfish", "Lactose"].map((item) => (
              <Chip
                key={item}
                label={item}
                selected={form.allergies.includes(item)}
                onClick={() => toggleAllergy(item)}
              />
            ))}
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 mt-6 text-sm">{error}</p>}

        {/* Continue */}
        <div className="mt-14">
          <button
            type="button"
            onClick={handleContinue}
            disabled={loading}
            className={`px-12 py-4 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg"
            }`}
          >
            {loading ? "Saving..." : "Continue →"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileSetup;
