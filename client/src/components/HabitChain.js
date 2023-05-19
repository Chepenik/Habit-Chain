import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HabitChain = (props) => {
  const { chain, giphyImage } = props;
    const renderChainImages = () => {
        const images = [];

        for (let i = 0; i < chain; i++) {
            images.push(<img key={i} src={giphyImage} alt="GIF" />);
        }

        return images;
    }

    // create as many giphy imgs as the streak count    
        // for loop

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