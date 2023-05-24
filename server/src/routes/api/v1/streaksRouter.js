import express from "express";
import { Streak } from "../../../models/index.js";

const streaksRouter = new express.Router();

streaksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const streak = await Streak.query().findById(id);
    if (streak) {
      return res.status(200).json({
        streakCount: streak.streakCount,
        active: streak.active,
      });
    } else {
      return res.status(404).json({ error: "Streak not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

streaksRouter.get("/:id/status", async (req, res) => { 
  const { id } = req.params;
  try {
    const streak = await Streak.query().findById(id);
    if (streak) {
      return res.status(200).json({
        active: streak.active,
      });
    } else {
      return res.status(404).json({ error: "Streak not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

streaksRouter.post("/", async (req, res) => {
  try {
    const { habitId } = req.body;
    const userId = parseInt(req.user.id, 10);
    const previousStreak = await Streak.query().findOne({ userId, habitId });

    let updatedStreak;

      updatedStreak = await Streak.query()
        .patchAndFetchById(previousStreak.id, { active: true, streakCount: parseInt(previousStreak.streakCount) + 1 });

      if (updatedStreak.streakCount > updatedStreak.longestStreak) {
        updatedStreak = await Streak.query()
          .patchAndFetchById(previousStreak.id, { longestStreak:  parseInt(updatedStreak.streakCount) });
      }

    console.log("New streak created:", updatedStreak);
    return res.status(201).json({ streakCount: updatedStreak.streakCount });
  } catch (error) {
    console.error("Error creating new streak:", error);
    return res.status(500).json({ errors: error });
  }
});


// need to check if I have never added a habitchain
// if I successfully done two consecutive days
// if I try to add a habit-chain but I missed a day (this is where will use my isActive() to tell wether or not I've missed a day)


export default streaksRouter;