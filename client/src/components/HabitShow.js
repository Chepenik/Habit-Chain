import React, { useState, useEffect } from "react";
import HabitChain from "./HabitChain";

const HabitShow = (props) => {
  const { habitId } = props;
  const [habit, setHabit] = useState(null);
  const [habitChain, setHabitChain] = useState(0);
  const [streakActive, setStreakActive] = useState(false); 
  const [longestStreak, setLongestStreak] = useState(0);

  const fetchHabit = async () => {
    try {
      const response = await fetch(`/api/v1/habits/${habitId}`);
      if (response.ok) {
        const data = await response.json();
        setHabit(data.habit);
        if (data.existingStreak) {
          setHabitChain(data.existingStreak.streakCount);
          setLongestStreak(data.existingStreak.longestStreak);
        }
      } else {
        console.error("Failed to fetch habit:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching habit:", error);
    }
  };

  const fetchStreakStatus = async () => {
    try {
      const response = await fetch(`/api/v1/streaks/${habitId}/status`); 
      if (response.ok) {
        const data = await response.json();
        setStreakActive(data.active);
      } else {
        console.error("Failed to fetch streak status:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching streak status:", error);
    }
  };

  useEffect(() => {
    fetchHabit();
    fetchStreakStatus(); 
  }, [habitChain, longestStreak]);

  const handleButtonClick = async () => {
    try {
      const response = await fetch("/api/v1/streaks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ habitId: parseInt(habitId, 10) }),
      });
      if (response.ok) {
        const data = await response.json();
        setHabitChain(data.streakCount);
        setStreakActive(true);
        console.log("Streak count updated successfully");
        console.log("New streak:", data);
      } else {
        console.error("Failed to update streak count:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating streak count:", error);
    }
  };

  const handleResetClick = async () => {
    try {
      const response = await fetch("/api/v1/streaks/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ habitId: parseInt(habitId, 10) }),
      });
      if (response.ok) {
        const data = await response.json();
        setHabitChain(data.streakCount);
        setStreakActive(true);
        console.log("Streak count updated successfully");
        console.log("New streak:", data);
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
          <b>How to reduce the friction involved with completing this habit:</b>{" "}
          {habit.reduceFriction}
        </p>
        <p>
          <b>Why I want to make this a habit:</b> {habit.why}
        </p>
        <p>
          <b>Longest Streak:</b> {longestStreak}
        </p>
        <p>
          <b>Status:</b>{" "}
          {streakActive === null ? "Loading..." : streakActive ? "active" : "inactive"}
        </p>
        <div className="streak-count">
          <p>
            <b>Streak Count:</b> {habitChain}
          </p>
        </div>
      </div>
      <div className="streakButton">
        <button className="glow-on-hover signup-link" onClick={handleButtonClick}>
          Click To Add To Your Streak
        </button>
      </div>
      <div className="resetButton">
        <button className="glow-on-hover signup-link" onClick={handleResetClick}>
          Click To Restart Your Streak
        </button>
      </div>
      <HabitChain chain={habitChain} giphyImage={habit.giphy} />
    </div>
  );
};

export default HabitShow;