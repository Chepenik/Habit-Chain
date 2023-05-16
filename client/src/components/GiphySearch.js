// make a get request
//instead of adding a body pass along the search query as a query string
//make the query param a key value pair so it has a name and my backend can find the specific query param

import React, { useState } from "react";

const GiphySearch = ({ query, onSelect, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [searchResults, setSearchResults] = useState([]);

  const handleSelect = (giphy) => {
    onSelect(giphy);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/v1/giphy?searchTerm=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.giphyResults);
    } catch (error) {
      console.error("Error searching GIFs:", error);
    }
  };

  return (
    <div className="giphy-search">
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
            <img src={giphy.images.url} alt={giphy.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiphySearch;
