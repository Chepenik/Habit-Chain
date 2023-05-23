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
    const previousStreak = await Streak.query()
      .findOne({ userId: userId, habitId: habitId, active: true });

    let updatedStreak;
    if (previousStreak) {
      console.log("Streak already exists");
      console.log(previousStreak);
      console.log(previousStreak.streakCount);
      updatedStreak = await Streak.query()
        .patchAndFetchById(previousStreak.id, { streakCount: parseInt(previousStreak.streakCount) + 1 });
    } else {
      console.log("Streak does not exist, creating new");

      updatedStreak = await Streak.query().insert({
        active: true,
        streakCount: 1,
        habitId: habitId,
        userId: userId,
        startDate: new Date().toISOString(),
        longestStreak: 0,
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