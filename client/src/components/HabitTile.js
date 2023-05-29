import React from "react";
import { Link } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";

const HabitTile = (props) => {
  const { habit, streakCount, active, handleDelete } = props;

  const deleteHabit = () => {
    if (window.confirm("Are you sure you want to delete this habit? Once deleted this can't be undone!!")) {
      handleDelete(habit.id);
    }
  };

  return (
    <>
      <div className="habit-tile">
        <Link to={`/habits/${habit.id}`} className="habit-link">
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
        </Link>
        <button onClick={deleteHabit}>Delete Habit <BsTrash3Fill /></button>
      </div>
    </>
  );
};

export default HabitTile;