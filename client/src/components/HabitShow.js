import React, { useState, useEffect } from "react";

const HabitShow = (props) => {
  const { habitId } = props;
  const [habit, setHabit] = useState(null);

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
  }, [habitId]);

  const handleButtonClick = () => {
    // Will need to add my button click logic here
    console.log("Button clicked!");
  };

  if (!habit) {
    return <p>Loading habit...</p>;
  }

  return (
    <div className="habit-show-container">
      <div className="habit-show">
        <img src={habit.giphy} alt="GIF" />
        <h1>{habit.name}</h1>
        <p><b>How to reduce the friction involved with completing this habit:</b> {habit.reduceFriction}</p>
        <p><b>Why I want to make this a habit:</b> {habit.why}</p>
      </div>
      <div className="streakButton">
        <button onClick={handleButtonClick}>Ahhhhhh I'm being clicked</button>
      </div>
    </div>
  );
};

export default HabitShow;