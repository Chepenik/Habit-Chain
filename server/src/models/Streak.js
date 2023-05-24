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

  restartStreak(streakType) {
    this.streakCount = 0;
    this.startDate = new Date().toISOString();
    this.streakType = streakType; 
  }

  isActive() {
    const today = new Date();
    const startDate = new Date(this.startDate);
    let endDate;
  
    if (this.streakType === 'week') {
      endDate = dateFns.addDays(startDate, 7);
    } else if (this.streakType === 'month') {
      endDate = dateFns.addMonths(startDate, 1);
    } else {
      return false; // Return false for invalid streakType
    }
  
    return dateFns.isWithinInterval(today, { start: startDate, end: endDate });
  }
  
}

module.exports = Streak;