import express from "express";
import { Streak } from "../../../models/index.js";

const streaksRouter = new express.Router();

// not being used yet but will need to get streaks to render on the frontend once streakCount is properly updating
streaksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const streak = await Streak.query().findById(id);
    return res.status(200).json({ streak });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

streaksRouter.post("/", async (req, res) => {
    try {
      const { habitId } = req.body;
      const userId = parseInt(req.user.id, 10);
      const previousStreak = await Streak.query()
        .findOne({ userId: userId, habitId: habitId, active: true })

      let updatedStreak;
      if (previousStreak) {
        console.log("streak already exists")
        console.log(previousStreak)
        console.log(previousStreak.streakCount)
        updatedStreak = await Streak.query()
          .patchAndFetchById(previousStreak.id, { streakCount: parseInt(previousStreak.streakCount) + 1});
      } else {
        console.log("streak does not exist, creating new")

        updatedStreak = await Streak.query().insert({
          active: true,
          streakCount: 1,
          habitId: habitId,
          userId: userId
        });
      }
  
      console.log("New streak created:", updatedStreak);
      return res.status(201).json({ streakCount: updatedStreak.streakCount });
    } catch (error) {
      console.error("Error creating new streak:", error);
      return res.status(500).json({ errors: error });
    }
  });  
  
export default streaksRouter;