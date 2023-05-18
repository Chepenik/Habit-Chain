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
            <p>Streak: *Will need to add streak count here*</p>
          </div>
          <div className="cell small-12 medium-4">
            <img src={habit.giphy} alt="GIF" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HabitTile;