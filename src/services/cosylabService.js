const WEBHOOK_URL = "http://localhost:5678/webhook-test/recipe";

// ---------------- CACHE CONFIG ----------------

const CACHE_KEY = "cachedRecipes";
const CACHE_TIME_KEY = "cachedRecipes_time";
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

// ---------------- FETCH RECIPES ----------------

export const fetchIndianRecipes = async (user, { signal, forceRefresh = false } = {}) => {
  if (!user) throw new Error("User profile missing");

  try {
    // ✅ 1️⃣ Cache Check
    if (!forceRefresh) {
      const cached = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

      if (cached && cachedTime) {
        const isExpired = Date.now() - Number(cachedTime) > CACHE_TTL;

        if (!isExpired) {
          console.log("✅ Using cached recipes");
          return JSON.parse(cached);
        }

        console.log("⌛ Cache expired → fetching new recipes");
      }
    } else {
      console.log("🔄 Force refresh → ignoring cache");
    }

    // ✅ 2️⃣ Call n8n webhook
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
      body: JSON.stringify({
        heightCm: user.heightCm,
        weightKg: user.weightKg,
        gender: user.gender.toLowerCase(),
        age: user.age,
        lifestyle: mapActivityLevel(user.activityLevel),
        goal: user.goalType.toLowerCase(),
        dietType: user.dietType,
        cuisine: user.defaultCuisine,
        allergies: user.allergies,
        diseases: user.diseases,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch recipes from n8n");
    }

    const data = await res.json();
    const normalized = normalizeRecipes(data.recipes ?? data);

    // ✅ 3️⃣ Save Cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(normalized));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    console.log("✅ Recipes cached");

    return normalized;

  } catch (err) {
    if (err.name === "AbortError") {
      console.log("🛑 Recipe fetch aborted");
      return [];
    }

    console.error("❌ Recipe fetch error:", err);
    throw err;
  }
};

// ---------------- MANUAL REFRESH ----------------

export const refreshRecipesCache = () => {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_TIME_KEY);
  console.log("🧹 Recipes cache cleared");
};

// ---------------- NORMALIZE RECIPES ----------------

const normalizeRecipes = (data) => {
  const recipesArray = Array.isArray(data)
    ? data
    : Array.isArray(data?.recipes)
    ? data.recipes
    : [];

  return recipesArray.map((recipe, index) => ({
    id: recipe.Recipe_id ?? recipe._id ?? index + 1,

    title:
      recipe.Recipe_title ??
      recipe.title ??
      recipe.name ??
      "Untitled Recipe",

    time: recipe.total_time
      ? `${recipe.total_time} min`
      : recipe.cook_time
      ? `${recipe.cook_time} min`
      : "—",

    servings: recipe.servings ?? "1 serving",

    calories: recipe.calories
      ? `${recipe.calories} kcal`
      : "—",

    protein: recipe.protein ? `${recipe.protein}g protein` : "",
    carbs: recipe.carbs ? `${recipe.carbs}g carbs` : "",

    tags: [
      recipe.Region,
      recipe.Sub_region,
      recipe.Source,
    ].filter(Boolean),

    image:
      recipe.image ??
      `https://source.unsplash.com/600x400/?${encodeURIComponent(
        recipe.Recipe_title || "indian food"
      )}`,
  }));
};

// ---------------- ACTIVITY LEVEL MAPPING ----------------

const mapActivityLevel = (level) => {
  const map = {
    SEDENTARY: "sedentary",
    LIGHT: "light",
    MODERATE: "moderate",
    ACTIVE: "active",
    ATHLETE: "athlete",
  };

  return map[level] || "moderate";
};
