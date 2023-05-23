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

  isActive() {
    const today = new Date();
    const startDate = new Date(this.startDate);

    if (this.streakType === 'week') {
      const endDate = dateFns.addDays(startDate, 7);
      return dateFns.isWithinInterval(today, { start: startDate, end: endDate });
    }

    if (this.streakType === 'month') {
      const endDate = dateFns.addMonths(startDate, 1);
      return dateFns.isWithinInterval(today, { start: startDate, end: endDate });
    }

    if (this.streakType === 'day') {
      return dateFns.isSameDay(today, startDate);
    }

    return false;
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);
    if (!this.isActive() && this.streakCount > this.longestStreak) {
      this.longestStreak = this.streakCount;
    }
  }
}

module.exports = Streak;