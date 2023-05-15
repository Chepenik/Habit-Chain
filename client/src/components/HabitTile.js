import React from "react";
import { Link } from "react-router-dom";

const HabitTile = (props) => {
  const { habit } = props;

  return (
    <div className="habit-tile">
      <Link to={`/habits/${habit.id}`} className="habit-link">
        <p className="habit-name">{habit.name}</p>
        <p>Reduce Friction: {habit.reduceFriction}</p>
        <p>Why: {habit.why}</p>
      </Link>
    </div>
  );
};

export default HabitTile;

