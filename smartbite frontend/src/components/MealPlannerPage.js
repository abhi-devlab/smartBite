import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import MealDisplay from "./MealDisplay";

const MealPlannerPage = () => {
  const [mealPlanData, setMealPlanData] = useState(null);

  const handleMealPlanGenerated = (data) => {
    setMealPlanData(data);  // data is full plan now, not just an ID
  };

  return (
    <div>
      <ProfileForm onMealPlanGenerated={handleMealPlanGenerated} />
      {mealPlanData && <MealDisplay mealPlan={mealPlanData} />}
    </div>
  );
};

export default MealPlannerPage;
