import React, { useState, useEffect } from "react";
import HabitTile from "./HabitTile";

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [streakCounts, setStreakCounts] = useState({});

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

  const fetchStreakCount = async (habitId) => {
    try {
      const response = await fetch(`/api/v1/streaks/${habitId}`);
      if (response.ok) {
        const data = await response.json();
        return data.streak.streakCount;
      } else {
        console.error("Failed to fetch streak:", response.statusText);
        return 0; 
      }
    } catch (error) {
      console.error("Error fetching streak:", error);
      return 0; 
    }
  };

  const fetchStreakCounts = async () => {
    const counts = {};
    for (const habit of habits) {
      const streakCount = await fetchStreakCount(habit.id);
      counts[habit.id] = streakCount;
    }
    setStreakCounts(counts);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      fetchStreakCounts();
    }
  }, [habits]);

  const habitItems = habits.map((habit) => (
    <HabitTile
      key={habit.id}
      habit={habit}
      streakType={habit.streakType}
      streakCount={streakCounts[habit.id] || 0}
    />
  ));

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