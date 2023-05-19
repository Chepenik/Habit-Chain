import React, { useState, useEffect } from "react";
import HabitChain from "./HabitChain";

const HabitShow = (props) => {
  const { habitId } = props;
  const [habit, setHabit] = useState(null);
  const [habitChain, setHabitChain] = useState([]);

  const fetchHabit = async () => {
    try {
      const response = await fetch(`/api/v1/habits/${habitId}`);
      if (response.ok) {
        const data = await response.json();
        setHabit(data.habit);
      } else {
        console.error("Failed to fetch habit:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching habit:", error);
    }
  };

  useEffect(() => {
    fetchHabit();
  }, []);

  const handleButtonClick = async () => {
    try {
      // Make a POST request to update the streak count
      const response = await fetch("/api/v1/streaks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ habitId: parseInt(habitId, 10) }), // Parse habitId as integer
      });
      if (response.ok) {
        const data = await response.json();
        // Update the habit chain with the new streak
        setHabitChain((prevChain) => [...prevChain, { habitId, giphy: habit.giphy }]);
        console.log("Streak count updated successfully");
        console.log("New streak:", data.streak);
      } else {
        console.error("Failed to update streak count:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating streak count:", error);
    }
  };

  if (!habit) {
    return <p>Loading habit...</p>;
  }

  return (
    <div className="habit-show-container">
      <div className="habit-show">
        <img src={habit.giphy} alt="GIF" />
        <h1>{habit.name}</h1>
        <p>
          <b>How to reduce the friction involved with completing this habit:</b> {habit.reduceFriction}
        </p>
        <p>
          <b>Why I want to make this a habit:</b> {habit.why}
        </p>
      </div>
      <div className="streakButton">
        <button className="glow-on-hover signup-link" onClick={handleButtonClick}>
          Click To Add To Your Streak
        </button>
      </div>
      <HabitChain chain={habitChain} />
    </div>
  );
};

export default HabitShow;