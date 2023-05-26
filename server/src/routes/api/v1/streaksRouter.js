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
console.log("previousStreak", previousStreak)
      updatedStreak = await Streak.query()
        .patchAndFetchById(previousStreak.id, { active: true, streakCount: parseInt(previousStreak.streakCount) + 1 });
    
      if (parseInt(updatedStreak.streakCount) > parseInt(updatedStreak.longestStreak)) {
        updatedStreak = await Streak.query()
          .patchAndFetchById(previousStreak.id, { longestStreak: parseInt(updatedStreak.streakCount, 10) });
      }

    console.log("New streak created:", updatedStreak);
    return res.status(201).json({ streakCount: updatedStreak.streakCount });
  } catch (error) {
    console.error("Error creating new streak:", error);
    return res.status(500).json({ errors: error });
  }
});

streaksRouter.post("/delete", async (req, res) => {
  try {
    const { habitId } = req.body;
    const userId = parseInt(req.user.id, 10);
    const previousStreak = await Streak.query().findOne({ userId, habitId });

    if (previousStreak.active === true) {
      const updatedStreak = await Streak.query().patchAndFetchById(previousStreak.id, {
        active: false,
        streakCount: 0
      });

      console.log("Streak reset successfully");
      console.log("New streak:", updatedStreak);

      return res.status(201).json({ streakCount: updatedStreak.streakCount });
    } else {
      console.error("No previous streak found for the given user and habit");
      return res.status(404).json({ error: "No previous streak found" });
    }
  } catch (error) {
    console.error("Error resetting streak:", error);
    return res.status(500).json({ error: "Failed to reset streak" });
  }
});

export default streaksRouter;