import React from "react";

const HabitChain = (props) => {
  const { chain } = props;

  return (
    <div className="habit-chain">
      <h2>Habit Chain:</h2>
      {chain.map((item, index) => (
        <div key={index} className="habit-chain-item">
          {/* Render habit chain item based on the habitId */}
          <img src={item.giphy} alt="GIF" />
        </div>
      ))}
    </div>
  );
};

export default HabitChain;