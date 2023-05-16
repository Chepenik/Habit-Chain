import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import GiphySearch from "./GiphySearch";

const HabitForm = () => {
  const [habitData, setHabitData] = useState({
    name: "",
    reduceFriction: "",
    why: "",
    giphy: "",
  });

  const [redirect, setRedirect] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setHabitData({
      ...habitData,
      [event.target.name]: event.target.value,
    });
  };

  const handleGiphySelect = (giphy) => {
    setHabitData({
      ...habitData,
      giphy: giphy.images.original.url,
    });
  };

  const handleGiphySearch = async () => {
    try {
      console.log("Calling handleGiphySearch");
      const response = await fetch(`/api/v1/giphy?searchTerm=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        if (data.giphyResults.length > 0) {
          setHabitData({
            ...habitData,
            giphy: data.giphyResults[0].images.original.url,
          });
        } else {
          console.error("No GIFs found.");
        }
      } else {
        console.error("Failed to search GIFs");
      }      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!habitData.name) {
      errors.name = "Please enter the habit name";
    }
    if (!habitData.reduceFriction) {
      errors.reduceFriction = "Please enter the steps to reduce friction";
    }
    if (!habitData.why) {
      errors.why = "Please enter the reason for starting the habit";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch("/api/v1/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        console.error("Failed to create habit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    handleGiphySearch();
  }, [searchTerm]);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="habit-form">
      <h2>Add a New Habit</h2>
      <div className="form-group">
        <label htmlFor="giphy">Pick a Gif to represent your habit:</label>
        <div className="giphy-search-container">
          <GiphySearch
            query={habitData.giphy}
            onSelect={handleGiphySelect}
            onSearch={setSearchTerm}
          />
          {habitData.giphy && (
            <div className="selected-giphy-container">
              <img src={habitData.giphy} alt="Selected Giphy" />
            </div>
          )}
        </div>
      </div>

      {/* //pass in some tiles to display the gifs */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            What's the name of the habit you want to start a streak for?
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={habitData.name}
            onChange={handleChange}
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="reduceFriction">
            What steps will you take to minimize any friction or difficulties
            associated with completing the habit, ensuring its daily completion?
          </label>
          <input
            type="text"
            id="reduceFriction"
            name="reduceFriction"
            value={habitData.reduceFriction}
            onChange={handleChange}
          />
          {formErrors.reduceFriction && (
            <p className="error">{formErrors.reduceFriction}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="why">
            Why do you have the desire to initiate a streak for this particular
            habit?
          </label>
          <input
            type="text"
            id="why"
            name="why"
            value={habitData.why}
            onChange={handleChange}
          />
          {formErrors.why && <p className="error">{formErrors.why}</p>}
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Add Habit
          </button>
        </div>
      </form>
    </div>
  );  
};

export default HabitForm;