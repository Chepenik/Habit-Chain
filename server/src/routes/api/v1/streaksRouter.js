import express from "express";
import { Streak } from "../../../models/index.js";

const streaksRouter = new express.Router();

streaksRouter.get("/", async (req, res) => {
  try {
    const streaks = await Streak.query();
    return res.status(200).json({ streaks });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

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

    console.log("Received request to create a new streak");
    console.log("habitId:", habitId);
    console.log("userId:", userId);

    // Add logic to create a new streak record associated with the habitId and userId
    const streak = await Streak.query().insert({ active: true, streakCount: 0, habitId, userId });

    console.log("New streak created:", streak);

    return res.status(201).json({ streak });
  } catch (error) {
    console.error("Error creating new streak:", error);
    return res.status(500).json({ errors: error });
  }
});

export default streaksRouter;