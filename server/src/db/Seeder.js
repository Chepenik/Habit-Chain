/* eslint-disable no-console */
import { connection } from "../boot.js"
import HabitSeeder from "./seeders/HabitSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import StreakSeeder from "./seeders/StreakSeeder.js"

class Seeder {
  static async seed() {
    await UserSeeder.seed();
    await HabitSeeder.seed();
    await StreakSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;