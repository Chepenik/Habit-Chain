import express from "express";
import { Habit, Streak } from "../../../models/index.js";
import giphyRouter from "./giphyRouter.js";

const habitsRouter = new express.Router();

habitsRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await Habit.query().where({ userId });
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
    const { name, reduceFriction, why, giphy } = req.body;
    const userId = parseInt(req.user.id, 10); 
    const habit = await Habit.query().insertAndFetch({ name, reduceFriction, why, giphy, userId });
console.log(habit)
    const streak = await Streak.query().insertAndFetch({
      active: false,
      streakCount: 0,
      habitId: parseInt(habit.id),
      userId: userId,
      startDate: new Date().toISOString(),
      longestStreak: 0,
    });

    habit.giphyUrl = `/api/v1/habits/${habit.id}/giphy`;

    return res.status(201).json({ habit, redirect: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

habitsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const habit = await Habit.query().findById(id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    if (habit.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this habit" });
    }

    await Streak.query().delete().where({ habitId: id });
    await Habit.query().deleteById(id);

    return res.status(200).json({ message: "Habit was deleted" });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});


habitsRouter.use("/:habitId/giphy", giphyRouter);

export default habitsRouter;