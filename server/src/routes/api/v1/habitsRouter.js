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

habitsRouter.post("/", async (req, res) => {
  try {
    const { name, reduceFriction, why } = req.body;
    const userId = parseInt(req.user.id, 10); 
    const habit = await Habit.query().insert({ name, reduceFriction, why, userId });
    return res.status(201).json({ habit });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default habitsRouter;