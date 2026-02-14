import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProfileSetup from "./pages/ProfileSetup";
import Journey from "./pages/Journey";
import PlanType from "./pages/PlanType";
import DietPlan from "./pages/DietPlan";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import SmartCart from "./pages/SmartCart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<ProfileSetup />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/plan-type" element={<PlanType />} />
        <Route path="/diet-plan" element={<DietPlan />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/smart-cart" element={<SmartCart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
