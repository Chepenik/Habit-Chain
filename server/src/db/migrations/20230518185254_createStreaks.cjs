/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
  exports.up = async (knex) => {
    await knex.schema.createTable("streaks", (table) => {
      table.bigIncrements("id").primary();
      table.boolean("active").notNullable();
      table.bigInteger("streakCount").notNullable();
      table.bigInteger("habitId").references("habits.id").notNullable().index().unsigned();
      table.bigInteger("userId").references("users.id").notNullable().index().unsigned(); 
      table.timestamp("startDate").notNullable().defaultTo(knex.fn.now());
      table.bigInteger("longestStreak").defaultTo(0);
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now()); //when I change active to inactive updateAt will change so it might make sense to have lastStreak  

    });
  };
  
  /**
   * @param {Knex} knex
   */
  exports.down = (knex) => {
    return knex.schema.dropTable("streaks");
  };  