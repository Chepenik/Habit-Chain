import React, { useState } from "react";

const HabitForm = () => {
  const [habitData, setHabitData] = useState({
    name: "",
    reduceFriction: "",
    why: "",
  });

  const handleChange = (event) => {
    setHabitData({
      ...habitData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your code here to handle form submission
  };

  return (
    <div className="habit-form">
      <h2>Add a New Habit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">What's The Name Of The Habit You Want To Start A Steak For?</label>
          <input
            type="text"
            id="name"
            name="name"
            value={habitData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reduceFriction">What Is One Thing You Will Do To Reduce Friction So You Can Complete This Habit Daily?</label>
          <input
            type="text"
            id="reduceFriction"
            name="reduceFriction"
            value={habitData.reduceFriction}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="why">Why Do You Want To Start A Streak For This Habit?</label>
          <input
            type="text"
            id="why"
            name="why"
            value={habitData.why}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Add Habit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;