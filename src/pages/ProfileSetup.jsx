import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../components/form/ProgressBar";
import InputField from "../components/form/InputField";
import ToggleSwitch from "../components/form/ToggleSwitch";
import Chip from "../components/form/Chip";

const ProfileSetup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    weight: "",
    gender: "Male",
    goal: "Weight Loss",
    city: "",
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    allergies: []
  });

  const [error, setError] = useState("");

  const toggleAllergy = (item) => {
    setForm((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(item)
        ? prev.allergies.filter((a) => a !== item)
        : [...prev.allergies, item]
    }));
  };

  const handleContinue = () => {
    if (!form.age || !form.weight || !form.city) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");
    navigate("/journey");
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 sm:p-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Profile Setup
          </h1>
          <div className="mt-4">
            <ProgressBar step={1} total={3} />
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label="Age *"
            type="number"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
          />

          <InputField
            label="Weight (kg) *"
            type="number"
            value={form.weight}
            onChange={(e) =>
              setForm({ ...form, weight: e.target.value })
            }
          />
        </div>

        {/* Gender */}
        <div className="mt-8">
          <label className="block text-sm text-gray-600 mb-3">
            Gender
          </label>

          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            {["Male", "Female", "Other"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setForm({ ...form, gender: g })}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  form.gender === g
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Fitness Goal */}
        <div className="mt-8">
          <label className="block text-sm text-gray-600 mb-2">
            Fitness Goal
          </label>

          <div className="relative">
            <select
              value={form.goal}
              onChange={(e) =>
                setForm({ ...form, goal: e.target.value })
              }
              className="w-full appearance-none bg-gray-100 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            >
              <option>Weight Loss</option>
              <option>Muscle Gain</option>
              <option>Maintenance</option>
              <option>Athletic Performance</option>
              <option>Body Recomposition</option>
              <option>General Fitness</option>
            </select>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>
        </div>

        {/* City */}
        <div className="mt-8">
          <label className="block text-sm text-gray-600 mb-2">
            City *
          </label>

          <div className="relative">
            <select
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              className="w-full appearance-none bg-gray-100 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            >
              <option value="">Select City</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Pune</option>
              <option>Chandigarh</option>
            </select>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="mt-12">
          <h2 className="font-semibold text-lg text-gray-900 mb-6">
            Dietary Preferences
          </h2>

          <div className="space-y-4">
            <ToggleSwitch
              label="Vegetarian"
              checked={form.vegetarian}
              onChange={() =>
                setForm({ ...form, vegetarian: !form.vegetarian })
              }
            />

            <ToggleSwitch
              label="Vegan"
              checked={form.vegan}
              onChange={() =>
                setForm({ ...form, vegan: !form.vegan })
              }
            />

            <ToggleSwitch
              label="Gluten Free"
              checked={form.glutenFree}
              onChange={() =>
                setForm({ ...form, glutenFree: !form.glutenFree })
              }
            />

            <ToggleSwitch
              label="Dairy Free"
              checked={form.dairyFree}
              onChange={() =>
                setForm({ ...form, dairyFree: !form.dairyFree })
              }
            />
          </div>
        </div>

        {/* Allergies */}
        <div className="mt-12">
          <h2 className="font-semibold text-lg text-gray-900 mb-6">
            Allergies & Restrictions
          </h2>

          <div className="flex flex-wrap gap-3">
            {["Nuts", "Soy", "Eggs", "Shellfish", "Lactose"].map(
              (item) => (
                <Chip
                  key={item}
                  label={item}
                  selected={form.allergies.includes(item)}
                  onClick={() => toggleAllergy(item)}
                />
              )
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 mt-8 text-sm">
            {error}
          </p>
        )}

        {/* Continue */}
        <div className="mt-12">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full md:w-auto bg-gradient-to-r from-orange-400 to-orange-600 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Continue →
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProfileSetup;
