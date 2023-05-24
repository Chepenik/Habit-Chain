import React from "react";

const Welcome = () => {
    return (
        <div className="HabitIndex">
          <h1>Keep Stacking Those Habits</h1>
          <img className="HabitChainImage" src="https://nostr.build/p/nb8240.jpg" alt="Habit Tracker" />
            <h6>Habit-chain helps people visualize their habits. 
                <br></br>
                It is easy to lose sight of progress made! However, sticking with positive habits over time can lead to profound changes. 
                <br></br>
                Tony Robbins said it best,
                "People tend to overestimate what they can accomplish in a day and underestimate what they can accomplish in a year."
                </h6>
                <button>
                    <a href="/habits">Start Tracking</a>
                </button>
        </div>
      );
}

export default Welcome;