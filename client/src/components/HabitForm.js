import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import GiphySearch from "./GiphySearch";
import GiphyTile from "./GiphyTile";

const HabitForm = () => {
  const [habitData, setHabitData] = useState({
    name: "",
    reduceFriction: "",
    why: "",
    giphy: "",
    streakType: "",
  });

  const [redirect, setRedirect] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [giphyResults, setGiphyResults] = useState([]);
  const [selectedGiphy, setSelectedGiphy] = useState(null);

  const handleChange = (event) => {
    setHabitData({
      ...habitData,
      [event.target.name]: event.target.value,
    });
  };

  const handleGiphySelect = (giphy) => {
    setSelectedGiphy(giphy.images.original.url);
    setHabitData({
      ...habitData,
      giphy: giphy.images.original.url,
    });
    console.log("Selected Giphy:", giphy.images.original.url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("habitData:", habitData);

    const errors = {};
    if (!habitData.name) {
      errors.name = "Please enter the habit name";
    }
    if(!habitData.streakType) {
      errors.streakType = "Please select streak type";
    }
    if (!habitData.reduceFriction) {
      errors.reduceFriction = "Please enter the steps to reduce friction";
    }
    if (!habitData.why) {
      errors.why = "Please enter the reason for starting the habit";
    }
    if (!habitData.giphy) {
      errors.giphy = "Please select a GIF";
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
  }, []); 

  if (redirect) {
    return <Redirect to="/" />;
  }

    return (
    <div className="habit-form">
        <h2>Add a New Habit</h2>
        <div className="giphy-search-container">
        <GiphySearch
            habitData={habitData}
            onSelect={handleGiphySelect}
            setGiphyResults={setGiphyResults}
            selectedGiphy={selectedGiphy}
        />
        {giphyResults.slice(0, 10).map((giphy) => (
            <GiphyTile
            key={giphy.id}
            giphy={giphy}
            isSelected={giphy.images.original.url === selectedGiphy}
            onSelect={handleGiphySelect}
            />
        ))}
        {formErrors.giphy && <p className="error">{formErrors.giphy}</p>}
        </div>
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
          <label htmlFor="streakType">Streak Type:</label>
            <select
              id="streakType"
              name="streakType"
              value={habitData.streakType}
              onChange={handleChange}
            >
              <option value="">Select Streak Type</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            {formErrors.streakType && (
              <p className="error">{formErrors.streakType}</p>
            )}
      </div>
        <div className="form-group">
            <label htmlFor="reduceFriction">
            What steps will you take to minimize any friction or difficulties associated with completing the habit, ensuring its daily completion?
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
            Why do you have the desire to initiate a streak for this particular habit?
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