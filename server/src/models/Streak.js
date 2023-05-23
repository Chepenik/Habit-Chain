const Model = require('./Model');
const Habit = require('./Habit');
const User = require('./User'); 

class Streak extends Model {
  static get tableName() {
    return 'streaks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['active', 'streakCount', 'habitId', 'userId'], 
      properties: {
        id: { type: 'integer' },
        active: { type: 'boolean' },
        streakCount: { type: 'integer' },
        habitId: { type: 'integer' },
        userId: { type: 'integer' }, 
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      habit: {
        relation: Model.BelongsToOneRelation,
        modelClass: Habit,
        join: {
          from: 'streaks.habitId',
          to: 'habits.id',
        },
      },
      user: { // Add user relation
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'streaks.userId',
          to: 'users.id',
        },
      },
    };
  }

  // isActive() {
  //   // Get the current date.
  //   const today = new Date();
  //   // Get the habit's start date.
  //   const startDate = this.startDate;
  //   // Calculate the number of days between the current date and the habit's start date.
  //   const daysSinceStart = dateFns.differenceInDays(today, startDate);
  //   // Check if the number of days since the habit's start date is less than or equal to the habit's streak length.
  //   return daysSinceStart <= this.streakLength;
  // }
}

module.exports = Streak;