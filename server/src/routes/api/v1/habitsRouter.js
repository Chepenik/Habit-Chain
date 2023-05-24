import express from "express";
import { Redirect } from "react-router-dom";
import { Habit, Streak } from "../../../models/index.js";
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
  const userId = req.user.id;
  try {
    const habit = await Habit.query().findById(id);
    const existingStreak = await Streak.query().findOne({ userId: userId, habitId: id });
    return res.status(200).json({ habit, existingStreak });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

habitsRouter.post("/", async (req, res) => {
  try {
    const { name, reduceFriction, why, giphy, streakType } = req.body;
    const userId = parseInt(req.user.id, 10); 
    const habit = await Habit.query().insert({ name, reduceFriction, why, giphy, streakType, userId });

    // const streak = await Streak.query().insert({
    //   active: false,
    //   streakCount: 0,
    //   habitId: habit.id,
    //   userId: userId,
    //   startDate: new Date().toISOString(),
    //   longestStreak: 0,
    // });

    habit.giphyUrl = `/api/v1/habits/${habit.id}/giphy`;

    return res.status(201).json({ habit, redirect: true });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

habitsRouter.use("/:habitId/giphy", giphyRouter);

export default habitsRouter;