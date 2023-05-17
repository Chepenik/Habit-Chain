/* eslint-disable no-console */
import { connection } from "../boot.js"
import HabitSeeder from "./seeders/HabitSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here
    await UserSeeder.seed();
    await HabitSeeder.seed();

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder