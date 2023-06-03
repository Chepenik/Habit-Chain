import React from "react";
import { BsLink } from "react-icons/bs";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-header">
        Visualize Your Habits with Habit<BsLink />Chain
      </h1>
      <img
        className="habit-tracker-image"
        src="https://nostr.build/p/nb10042.jpg"
        alt="Habit Tracker"
      />
      <p className="welcome-description">
        Habit-Chain is a web application designed to help you track and maintain positive habits.
        By utilizing gifs, pseudo blockchains, and user input, it enables you to create a habit-stacking routine that leads to long-lasting changes.
        It's easy to lose track of the progress you've made, but with HabitChain's visual interface, you can stay motivated and see your accomplishments at a glance.
        Building positive habits over time can have a profound impact on your life.
        As Tony Robbins once said, "People often overestimate what they can achieve in a day and underestimate what they can accomplish in a year."
      </p>
      <div className="habit-chain-images-container">
        <div className="habit-chain-welcome-item">
          <h3 className="habit-chain-image-title">Use the "Add A Habit" button in the top right to fill out a habit form</h3>
          <img
            className="habit-chain-demo"
            src="https://nostr.build/p/nb9534.jpg"
            alt="Habit Tracker"
          />
        </div>
        <div className="habit-chain-welcome-item">
          <hr />
          <h3 className="habit-chain-image-title">See all your habits on the index page</h3>
          <img
            className="habit-chain-demo"
            src="https://nostr.build/p/nb9536.jpg"
            alt="Habit Tracker"
          />
        </div>
        <div className="habit-chain-welcome-item">
          <hr />
          <h3 className="habit-chain-image-title">Add streaks to your Habit-Chain or reset the chain if you miss a day</h3>
          <img
            className="habit-chain-demo"
            src="https://nostr.build/p/nb9535.jpg"
            alt="Habit Tracker"
          />
        </div>
      </div>

      <div className="welcome-button">
        <button className="start-building-button">
          <a href="/habits">Ready To Start Building Positive Habits? Click Here To Start Tracking!</a>
        </button>
      </div>
    </div>
  );
};

export default Welcome;