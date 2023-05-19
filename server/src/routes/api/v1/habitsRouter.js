import express from "express";
import { Habit } from "../../../models/index.js";
import giphyRouter from "./giphyRouter.js";

const habitsRouter = new express.Router();

habitsRouter.get("/", async (req, res) => {
  try {
    const habits = await Habit.query();
    return res.status(200).json({ habits });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

habitsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await Habit.query().findById(id);
    return res.status(200).json({ habit });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

habitsRouter.post("/", async (req, res) => {
  try {
    const { name, reduceFriction, why, giphy } = req.body;
    const userId = parseInt(req.user.id, 10); 
    const habit = await Habit.query().insert({ name, reduceFriction, why, giphy, userId });

    habit.giphyUrl = `/api/v1/habits/${habit.id}/giphy`;
    
    return res.status(201).json({ habit });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

habitsRouter.use("/:habitId/giphy", giphyRouter);

export default habitsRouter;