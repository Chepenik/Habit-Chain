import React from "react";

const HabitChain = (props) => {
  const { chain } = props;

  return (
    <div className="habit-chain">
      <h2>Habit Chain:</h2>
      {chain.map((habitId, index) => (
        <div key={index} className="habit-chain-item">
          {/* Render habit chain item based on the habitId */}
          <img src={`/api/v1/habits/${habitId}/giphy`} alt="GIF" />
        </div>
      ))}
    </div>
  );
};

export default HabitChain;