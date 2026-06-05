import React from "react";
import { motion } from "framer-motion";
import "../styles/MealDisplay.css";

const MealDisplay = ({ mealPlan }) => {
  if (!mealPlan || !mealPlan.meal_plan) return <div>No meal plan data available.</div>;

  const {
    patient_name,
    meal_plan,
    maintenance_calories,
    allergy,
    deficiency,
    disease,
  } = mealPlan;

  if (meal_plan.length > 7) {
    console.warn(`Expected 7 days of meal plan, but got ${meal_plan.length}. Only showing first 7 days.`);
  }

  return (
    <section className="meal-section">
      <h2 className="section-title">👋 Hi {patient_name}!</h2>
      <h2 className="section-title">🥗 Your Personalized 7-Day Meal Plan</h2>
      <p className="subtitle">Based on your health profile and goals</p>

      <div className="meal-user-info">
        <p><strong>Maintenance Calories:</strong> {maintenance_calories} kcal</p>
        {allergy && <p><strong>Allergy:</strong> {allergy}</p>}
        {disease && <p><strong>Disease:</strong> {disease}</p>}
        {deficiency && <p><strong>Deficiency:</strong> {deficiency}</p>}
      </div>

      <div className="meal-plan-container">
        {meal_plan.slice(0, 7).map((day, index) => (
          <motion.div
            key={index}
            className="day-card-animated"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="day-title">Day {index + 1}</div>
            <div className="day-meals">
              <p>
                <strong>🍳 Breakfast:</strong>{" "}
                {day.breakfast?.name || "N/A"}{" "}
                {day.breakfast?.serving_g && day.breakfast?.calories ? (
                  <em>({day.breakfast.serving_g}g / {day.breakfast.calories} kcal)</em>
                ) : null}
              </p>
              <p>
                <strong>🥗 Lunch:</strong>{" "}
                {day.lunch?.name || "N/A"}{" "}
                {day.lunch?.serving_g && day.lunch?.calories ? (
                  <em>({day.lunch.serving_g}g / {day.lunch.calories} kcal)</em>
                ) : null}
              </p>
              <p>
                <strong>🍪 Snack:</strong>{" "}
                {day.snack?.name || "N/A"}{" "}
                {day.snack?.serving_g && day.snack?.calories ? (
                  <em>({day.snack.serving_g}g / {day.snack.calories} kcal)</em>
                ) : null}
              </p>
              <p>
                <strong>🍛 Dinner:</strong>{" "}
                {day.dinner?.name || "N/A"}{" "}
                {day.dinner?.serving_g && day.dinner?.calories ? (
                  <em>({day.dinner.serving_g}g / {day.dinner.calories} kcal)</em>
                ) : null}
              </p>
              <p><strong>🍓 Seasonal Fruit:</strong> {day.fruit || "N/A"}</p>
              <p className="total-calories">
                Total: {day.total_calories || "N/A"} / {maintenance_calories} kcal
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MealDisplay;
