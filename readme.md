# Habit-Chain

Habit-Chain is an open-source web app designed to help users keep track of their habits. It allows you to monitor your progress, set goals, and stay motivated.

## Getting Started

To run Habit-Chain locally, follow these steps:

1. Clone the repository from GitHub.
2. Install all the required packages by running the following command:

yarn install

or

npm install

3. If you don't want to create a custom name for your database, you can use the provided file `server/src/config/getDatabaseUrl.cjs` to configure your PostgreSQL database.
4. Start the development server by running the following command:

yarn dev

or 

npm run dev

## Deployment

Habit-Chain is functional and deployed at https://habitchain.herokuapp.com. Feel free to visit the live version of the app.

## Roadmap

Habit-Chain is an ongoing project, and there are several features currently in development. Some of the upcoming features include:

- Integration with Google login for a seamless authentication experience.
- Implementation of an escrow account, allowing users to store bitcoin in a wallet. If the habit goal isn't met, the bitcoin will be donated to a charity of the user's choice. If the goal is achieved, the bitcoin will be returned.
- Additional improvements and enhancements based on user feedback.
- Allowing users the ability to share their habits on social media easily

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or find any issues, feel free to submit a pull request. Together, we can make Habit-Chain even better :)

## Thanks

Thank you for checking out Habit-Chain! Your support and contributions are greatly appreciated. If you have any questions or feedback, please don't hesitate to reach out.
