const Model = require('./Model');
const Habit = require('./Habit');
const User = require('./User');
const dateFns = require('date-fns');

class Streak extends Model {
  static get tableName() {
    return 'streaks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['active', 'streakCount', 'habitId', 'userId', 'startDate', 'longestStreak'],
      properties: {
        id: { type: 'integer' },
        active: { type: 'boolean' },
        streakCount: { type: 'integer' },
        habitId: { type: 'integer' },
        userId: { type: 'integer' },
        startDate: { type: 'string' },
        longestStreak: { type: 'integer' },
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
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'streaks.userId',
          to: 'users.id',
        },
      },
    };
  }

  // restartStreak() {
  //   this.streakCount = 0;
  //   this.active = false;
  //   this.startDate = new Date().toISOString();
  // }

  isConsistent() {
    const today = new Date();
    const startDate = new Date(this.startDate);
    let endDate;
    const habit = this.$relatedQuery('habit');

    // need to pull in streakType from my habit table
    if (habit.streakType === 'daily') {
      endDate = dateFns.addDays(startDate, 1);
    } else if (habit.streakType === 'weekly') {
      endDate = dateFns.addWeeks(startDate, 1);
    } else if (habit.streakType === 'monthly') {
      endDate = dateFns.addMonths(startDate, 1);
    } else {
      return false; // Return false for invalid streakType
    }

    const isWithinInterval = dateFns.isWithinInterval(today, { start: startDate, end: endDate });

    if (!isWithinInterval) {
      // User missed a day, week, or month, reset streakCount and active
      this.streakCount = 0;
      this.active = false;
      return false;
    }

    return true;
  }
}

module.exports = Streak;