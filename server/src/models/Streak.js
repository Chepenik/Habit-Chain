const Model = require('./Model');
const Habit = require('./Habit');
const User = require('./User'); 
const date = require('date-fns');

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
}

module.exports = Streak;