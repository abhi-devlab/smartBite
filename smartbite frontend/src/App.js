import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ProfileForm from "./components/ProfileForm";
import MealDisplay from "./components/MealDisplay";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [mealPlanData, setMealPlanData] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                !mealPlanData ? (
                  <ProfileForm onMealPlanGenerated={setMealPlanData} />
                ) : (
                  <MealDisplay mealPlan={mealPlanData} />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
