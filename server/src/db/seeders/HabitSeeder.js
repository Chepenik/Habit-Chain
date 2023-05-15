import { Habit } from '../../models/index.js';

class HabitSeeder {
  static async seed() {
    const habitsData = [
      {
        name: "Running",
        reduceFriction: "Wearing proper shoes",
        why: "To improve cardiovascular health",
        userId: 1, // Provide the appropriate user ID
      },
      {
        name: "Reading 10 pages",
        reduceFriction: "Setting aside dedicated reading time",
        why: "To expand knowledge and improve focus",
        userId: 1, // Provide the appropriate user ID
      },
      {
        name: "Becoming a better developer",
        reduceFriction: "Practicing coding daily",
        why: "To enhance coding skills and stay updated",
        userId: 1, // Provide the appropriate user ID
      },
    ];

    for (const singleHabitData of habitsData) {
      const currentHabit = await Habit.query().findOne({ name: singleHabitData.name });
      if (!currentHabit) {
        await Habit.query().insert(singleHabitData);
      }
    }
  }
}

export default HabitSeeder;