import React, { useState } from "react";

const GiphySearch = ({ habitData, onSelect, onSearch, setGiphyResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSelect = (giphy) => {
    setHabitData({
      ...habitData,
      giphy,
    });
  };

  const handleSearch = async () => {
    const url = `/api/v1/giphy?searchTerm=${searchTerm}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setGiphyResults(data.giphyResults);
    } catch (error) {
      console.error("Error searching GIFs:", error);
    }
  };

  return (
    <div className="giphy-search">
      <label htmlFor="selectGif">What GIF represents your habit?:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for GIFs"
      />
      <button type="button" onClick={handleSearch} className="search-button">
        Search for GIFs
      </button>
      <div className="search-results">
        {searchResults.map((giphy) => (
          <div
            key={giphy.id}
            className="search-result"
            onClick={() => handleSelect(giphy)}
          >
            <img src={giphy.images.original.url} alt="GIF" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiphySearch;