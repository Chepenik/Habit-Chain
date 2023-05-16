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

  if (!habit) {
    return <p>Loading habit...</p>;
  }

  return (
    <div className="habit-show">
      <h1>{habit.name}</h1>
      <p>Reduce Friction: {habit.reduceFriction}</p>
      <p>Why: {habit.why}</p>
    </div>
  );
};

export default HabitShow;