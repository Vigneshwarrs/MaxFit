import React, { useState } from "react";

const WorkoutForm = () => {
  const [formData, setFormData] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input
    if (!formData.exercise || !formData.sets || !formData.reps) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Workout Entry Submitted:", formData);
    // Clear form
    setFormData({
      exercise: "",
      sets: "",
      reps: "",
      weight: "",
      notes: "",
    });
  };

  return (
    <div>
      <h2>Create Workout Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Exercise:</label>
          <input
            type="text"
            name="exercise"
            value={formData.exercise}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sets:</label>
          <input
            type="number"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="number"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
