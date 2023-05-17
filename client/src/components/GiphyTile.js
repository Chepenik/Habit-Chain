import React from "react";

const GiphyTile = ({ giphy, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(giphy);
  };

  const tileClassName = `giphy-tile${isSelected ? " selected" : ""}`;

  return (
    <div className={tileClassName} onClick={handleClick}>
      <img src={giphy.images.original.url} alt={giphy.title} />
    </div>
  );
};

export default GiphyTile;