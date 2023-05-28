import React from "react";
import { Link } from "react-router-dom";

const HabitTile = (props) => {
  const { habit, streakCount, active } = props;

  return (
    <>
      <Link to={`/habits/${habit.id}`} className="habit-link">
        <div className="habit-tile">
          <div className="grid-x">
            <div className="cell small-12 medium-8">
              <p className="habit-name">{habit.name}</p>
              <p>Streak: {streakCount}</p>
              <p>Status: {active ? 'active' : 'inactive'}</p>
            </div>
            <div className="cell small-12 medium-4">
              <img src={habit.giphy} alt="GIF" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HabitTile;