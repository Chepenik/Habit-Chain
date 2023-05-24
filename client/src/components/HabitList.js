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
        return {
          streakCount: data.streakCount,
          active: data.active
        };
      } else {
        console.error("Failed to fetch streak:", response.statusText);
        return {
          streakCount: 0,
          active: false
        };
      }
    } catch (error) {
      console.error("Error fetching streak:", error);
      return {
        streakCount: 0,
        active: false
      };
    }
  };
  

  const fetchStreakCounts = async () => {
    const counts = {};
    for (const habit of habits) {
      const streakData = await fetchStreakCount(habit.id);
      counts[habit.id] = streakData;
      habit.active = streakData.active;
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
      streakCount={streakCounts[habit.id] ? streakCounts[habit.id].streakCount : 0}
      active={habit.active}
    />
  ));

  return (
    <div className="HabitIndex">
      <h1>Keep Stacking Those Habits</h1>
      <h5>Like flappy bird you will never win Habit-Chain but you will have fun trying to hit new PRs</h5>
      <div className="habit-list">{habitItems}</div>
    </div>
  );
};

export default HabitList;