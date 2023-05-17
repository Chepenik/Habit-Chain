import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';

class UserSeeder {
  static async seed() {
    const userData = [
      {
        username: "chep",
        email: "conor@conor.com",
        password: "123"
      },
      {
        username: "john",
        email: "john@example.com",
        password: "123"
      },
      {
        username: "emma",
        email: "emma@example.com",
        password: "123"
      },
      {
        username: "randomuser1",
        email: "random1@example.com",
        password: "123"
      },
      {
        username: "randomuser2",
        email: "random2@example.com",
        password: "123"
      }
    ];

    for (const singleUserData of userData) {
      const { username, email, password } = singleUserData;

      const currentUser = await User.query().findOne({ email });
      if (!currentUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.query().insert({
          username,
          email,
          cryptedPassword: hashedPassword
        });
      }
    }
  }
}

export default UserSeeder;