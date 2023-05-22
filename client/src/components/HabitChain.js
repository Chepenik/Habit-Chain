import React from "react";
import { BsLink } from "react-icons/bs";

const HabitChain = (props) => {
  const { chain, giphyImage } = props;

  const renderChainImages = () => {
    const images = [];

    for (let i = 0; i < chain; i++) {
      images.push(
        <React.Fragment key={i}>
          <img src={giphyImage} alt="GIF" />
          {i < chain - 1 && <BsLink />}
        </React.Fragment>
      );
    }
    return images;
  };

  return (
    <div className="habit-chain">
      <h2>Habit Chain:</h2>
      <div className="habit-chain-item">
        {renderChainImages()}
      </div>
    </div>
  );
};

export default HabitChain;