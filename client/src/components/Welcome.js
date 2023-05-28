import React from "react";
import { BsLink } from "react-icons/bs";

const Welcome = () => {
  return (
    <div className="HabitIndex">
      <h1>Visualize Your Habits with Habit<BsLink />Chain</h1>
      <img
        className="HabitChainImage"
        src="https://nostr.build/p/nb8240.jpg"
        alt="Habit Tracker"
      />
      <h6>
      Habit-Chain is a web application designed to help you track and maintain positive habits. 
      <br />
      By utilizing gifs, pseudo blockchains, and user input, it enables you to create a habit-stacking routine that leads to long-lasting changes. 
        <br />
        <br />
        <br />
        It's easy to lose track of the progress you've made, but with HabitChain's visual interface, you can stay motivated and see your accomplishments at a glance.
        <br /> 
        Building positive habits over time can have a profound impact on your life.
        <br />
        <br />
        <br />
        As Tony Robbins once said, "People often overestimate what they can achieve in a day and underestimate what they can accomplish in a year."
      </h6>
      <div className="HabitChainImagesContainer">
        <h3>Use the "Add A Habit" button in the top right to fill out a habit form</h3>
        <img
          className="HabitChainImageOne"
          src="https://nostr.build/p/nb9534.jpg"
          alt="Habit Tracker"
          style={{ width: "500px", height: "auto", border: "2px solid black" }}
        />
        <h3>See all your habits on the index page</h3>
        <img
          className="HabitChainImageTwo"
          src="https://nostr.build/p/nb9536.jpg"
          alt="Habit Tracker"
          style={{ width: "500px", height: "auto", border: "2px solid black" }}
        />
        <h3>Add streaks to your Habit-Chain or reset the chain if you miss a day</h3>
        <img
          className="HabitChainImageThree"
          src="https://nostr.build/p/nb9535.jpg"
          alt="Habit Tracker"
          style={{ width: "500px", height: "auto", border: "2px solid black" }}
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