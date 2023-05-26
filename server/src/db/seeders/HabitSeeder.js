import { Habit } from '../../models/index.js';

class HabitSeeder {
  static async seed() {
    const habitsData = [
      {
        name: "Running",
        reduceFriction: "Wearing proper shoes",
        why: "To improve cardiovascular health",
        giphy: "https://media4.giphy.com/media/1iTH1WIUjM0VATSw/giphy.gif?cid=c07ef1757obfz2jhza6ntev176srzf3htr8n284hk4l2a4sm&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        userId: 1,
      },
      {
        name: "Reading 10 pages",
        reduceFriction: "Setting aside dedicated reading time on my calendar",
        why: "To expand knowledge and improve focus",
        giphy: "https://media4.giphy.com/media/I1U9DTjCqOF3i/giphy.gif?cid=c07ef1754eoh65n42u45gmw83tpsg890t1fs66a4trj45fyt&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        userId: 1, 
      },
      {
        name: "Becoming a better developer",
        reduceFriction: "Checking github everyday to see what other developers are working on",
        why: "To enhance coding skills and stay updated",
        giphy: "https://media1.giphy.com/media/2IudUHdI075HL02Pkk/giphy.gif?cid=c07ef17596p55bac8uvmf6zit83ojyc60lgv4vuxjz6m5meb&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        userId: 1, 
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