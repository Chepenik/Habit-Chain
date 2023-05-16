import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const HabitForm = () => {
  const [habitData, setHabitData] = useState({
    name: "",
    reduceFriction: "",
    why: "",
  });

  const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    setHabitData({
      ...habitData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/v1/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        console.error("Failed to create habit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="habit-form">
      <h2>Add a New Habit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            What's The Name Of The Habit You Want To Start A Steak For?
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={habitData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reduceFriction">
            What steps will you take to minimize any friction or difficulties
            associated with completing the habit, ensuring its daily completion?
          </label>
          <input
            type="text"
            id="reduceFriction"
            name="reduceFriction"
            value={habitData.reduceFriction}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="why">
            Why do you have the desire to initiate a streak for this particular
            habit?
          </label>
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