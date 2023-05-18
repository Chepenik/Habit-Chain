import { Streak } from '../../models/index.js';

class StreakSeeder {
  static async seed() {
    const streaksData = [
      {
        active: true,
        streakCount: 5,
        habitId: 1,
        userId: 1, // Hardcoded userId value
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        active: false,
        streakCount: 2,
        habitId: 2,
        userId: 1, // Hardcoded userId value
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        active: true,
        streakCount: 10,
        habitId: 3,
        userId: 1, // Hardcoded userId value
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