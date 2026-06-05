import React, { useState } from "react";
import "../styles/ProfileForm.css";

const ProfileForm = ({ onMealPlanGenerated }) => {
  const [formData, setFormData] = useState({
    patient_name: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    diet_pref: "",
    activity: "",
    allergies: "",
    deficiencies: "",
    diseases: "",
    exceptions: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allergens = ["Eggs", "Gluten", "Lactose (Dairy)", "Peanuts", "Shellfish", "Soy", "Tree Nuts"];
  const deficiencyOptions = ["Calcium", "Folate (Vitamin B9)", "Iron", "Magnesium", "Protein", "Vitamin B12", "Vitamin D", "Zinc"];
  const diseaseOptions = [
    "Diabetes", "Fatty Liver", "Gastritis", "Heart Disease", "High Cholesterol",
    "Hypertension", "Hypothyroidism", "Kidney Disease", "Obesity", "PCOS/PCOD"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Clean payload before sending
    const cleanedData = {
      ...formData,
      age: Number(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      diet_pref: formData.diet_pref.toLowerCase(),
      allergies: formData.allergies ? [formData.allergies] : [],
      deficiencies: formData.deficiencies ? [formData.deficiencies] : [],
      diseases: formData.diseases ? [formData.diseases] : []
    };

    try {
      console.log("Payload being sent:", cleanedData);

      const response = await fetch("http://localhost:8000/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Something went wrong");

      onMealPlanGenerated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-2xl font-bold mb-4">7-Day Meal Planner</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="patient_name"
          placeholder="Patient Name"
          value={formData.patient_name}
          onChange={handleChange}
          required
        />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} required />
        <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} required />

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select name="diet_pref" value={formData.diet_pref} onChange={handleChange} required>
          <option value="" disabled>Select Diet Preference</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Vegan">Vegan</option>
        </select>

        <select name="activity" value={formData.activity} onChange={handleChange} required>
          <option value="" disabled>Select Activity Level</option>
          <option value="Sedentary">Sedentary</option>
          <option value="Light">Light</option>
          <option value="Moderate">Moderate</option>
          <option value="Active">Active</option>
          <option value="VeryActive">Very Active</option>
        </select>

        <select name="allergies" value={formData.allergies} onChange={handleChange}>
          <option value="" disabled>Select Allergy (if any)</option>
          {allergens.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select name="deficiencies" value={formData.deficiencies} onChange={handleChange}>
          <option value="" disabled>Select Deficiency (if any)</option>
          {deficiencyOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select name="diseases" value={formData.diseases} onChange={handleChange}>
          <option value="" disabled>Select Disease (if any)</option>
          {diseaseOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <textarea
          name="exceptions"
          placeholder="Exceptions (e.g., no spicy food, no gluten)"
          value={formData.exceptions}
          onChange={handleChange}
          rows={3}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
