import { Streak } from '../../models/index.js';


class StreakSeeder {
  static async seed() {
    const streaksData = [
      {
        active: false,
        streakCount: 0,
        habitId: 1,
        userId: 1, 
        startDate: new Date().toISOString(),
        longestStreak: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        active: false,
        streakCount: 0,
        habitId: 2,
        userId: 1, 
        startDate: new Date().toISOString(),
        longestStreak: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        active: false,
        streakCount: 0,
        habitId: 3,
        userId: 1, 
        startDate: new Date().toISOString(),
        longestStreak: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    for (const streakData of streaksData) {
      await Streak.query().insert(streakData);
    }
  }
}

export default StreakSeeder;