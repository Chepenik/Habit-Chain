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
}

module.exports = Streak;