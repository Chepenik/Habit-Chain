import { Habit } from '../../models/index.js';

class HabitSeeder {
  static async seed() {
    const habitsData = [
      {
        name: "Running",
        reduceFriction: "Wearing proper shoes",
        why: "To improve cardiovascular health",
        giphy: "https://media1.giphy.com/media/2IudUHdI075HL02Pkk/giphy.gif?cid=c07ef17596p55bac8uvmf6zit83ojyc60lgv4vuxjz6m5meb&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        userId: 1,
        streakType: "monthly",
      },
      {
        name: "Reading 10 pages",
        reduceFriction: "Setting aside dedicated reading time",
        why: "To expand knowledge and improve focus",
        giphy: "https://media1.giphy.com/media/2IudUHdI075HL02Pkk/giphy.gif?cid=c07ef17596p55bac8uvmf6zit83ojyc60lgv4vuxjz6m5meb&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        userId: 1, 
        streakType: "daily",
      },
      {
        name: "Becoming a better developer",
        reduceFriction: "Practicing coding daily",
        why: "To enhance coding skills and stay updated",
        giphy: "https://media1.giphy.com/media/2IudUHdI075HL02Pkk/giphy.gif?cid=c07ef17596p55bac8uvmf6zit83ojyc60lgv4vuxjz6m5meb&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        userId: 1, 
        streakType: "daily",
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