const Model = require('./Model');
const User = require('./User');

class Habit extends Model {
  static get tableName() {
    return 'habits';
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "reduceFriction", "why", "streakType", "userId"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        reduceFriction: { type: "string" },
        why: { type: "string" },
        streakType: { type: "string", enum: ['daily', 'weekly', 'monthly'] }, 
        userId: { type: "integer" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }  

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'habits.userId',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Habit;