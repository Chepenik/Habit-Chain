// import dateFns from 'date-fns';

// async function checkStreakExpiration(streak) {
//   // Get the current date.
//   const today = new Date();

//   // Get the streak's start date.
//   const startDate = new Date(streak.startDate);

//   // Calculate the number of days between the current date and the streak's start date.
//   const daysSinceStart = dateFns.differenceInDays(today, startDate);

//   // Check if the number of days since the streak's start date is greater than or equal to the streak's length.
//   if (daysSinceStart >= streak.streakLength) {
//     // The streak has expired.
//     streak.active = false;

//     // Remove the streak from the database.
//     await db.delete('streaks', { id: streak.id });
//   }
// }

// export default checkStreakExpiration;