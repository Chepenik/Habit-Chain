import React from "react";
import { Link } from "react-router-dom";

const HabitTile = (props) => {
  const { habit } = props;

  return (
    <div className="habit-tile">
      <Link to={`/habits/${habit.id}`} className="habit-link">
        <div className="grid-x">
          <div className="cell small-12 medium-8">
            <p className="habit-name">{habit.name}</p>
          </div>
          <div className="cell small-12 medium-4">
            <p>Reduce Friction: {habit.reduceFriction}</p>
            <p>Why: {habit.why}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HabitTile;