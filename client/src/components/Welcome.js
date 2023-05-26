import React from "react";

const Welcome = () => {
  return (
    <div className="HabitIndex">
      <h1>Habit-chain helps people visualize their habits.</h1>
      <img
        className="HabitChainImage"
        src="https://nostr.build/p/nb8240.jpg"
        alt="Habit Tracker"
      />
      <h6>
        A simple web application using gifs, psuedo blockchains, and user input to help people keep stacking positive habits. 
        <br />
        It is so easy to lose sight of progress made! However, sticking with
        positive habits over time can lead to profound changes.
        <br />
        Tony Robbins said it best,
        "People tend to overestimate what they can accomplish in a day and
        underestimate what they can accomplish in a year."
      </h6>
      <div className="HabitChainImagesContainer">
        <h3>Use the "Add A Habit" button in the top right to fill out a habit form</h3>
        <img
          className="HabitChainImageOne"
          src="https://nostr.build/p/nb9534.jpg"
          alt="Habit Tracker"
        />
        <h3>See all your habits on the index page</h3>
        <img
          className="HabitChainImageTwo"
          src="https://nostr.build/p/nb9536.jpg"
          alt="Habit Tracker"
        />
        <h3>Add streaks to your Habit-Chain or reset the chain if you miss a day</h3>
        <img
          className="HabitChainImageThree"
          src="https://nostr.build/p/nb9535.jpg"
          alt="Habit Tracker"
        />
      </div>
      <div className="welcomeButton">
        <button>
          <a href="/habits">Ready To Start Building Postive Habits? Click Here To Start Tracking!</a>
        </button>
      </div>
    </div>
  );
};

export default Welcome;