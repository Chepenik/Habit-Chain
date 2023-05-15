import express from "express";
import { Habit } from "../../../models/index.js";

const habitsRouter = new express.Router();

habitsRouter.get("/", async (req, res) => {
  try {
    const habits = await Habit.query();
    return res.status(200).json({ habits });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default habitsRouter;