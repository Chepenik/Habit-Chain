import React, { useState, useEffect } from "react";
import HabitTile from "./HabitTile";

const HabitList = () => {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    try {
      const response = await fetch("/api/v1/habits");
      if (response.ok) {
        const data = await response.json();
        setHabits(data.habits);
      } else {
        console.error("Failed to fetch habits:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const habitItems = habits.map((habit) => {
    return <HabitTile key={habit.id} habit={habit} />;
  });

  return (
    <div className="HabitIndex">
      <h1>Keep Stacking Those Habits</h1>
      <img className="HabitChainImage" src="https://nostr.build/p/nb8240.jpg" alt="Habit Tracker" />
        <h6>Habit-chain helps people visualize their habits. 
            <br></br>
            It is easy to lose sight of progress made! However, sticking with positive habits over time can lead to profound changes. 
            <br></br>
            Tony Robbins said it best,
            "People tend to overestimate what they can accomplish in a day and underestimate what they can accomplish in a year."
            </h6>
      <div className="habit-list">{habitItems}</div>
    </div>
  );
};

export default HabitList;