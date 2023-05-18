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
      table.bigInteger("userId").references("users.id").notNullable().index().unsigned(); // Add userId column
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param {Knex} knex
   */
  exports.down = (knex) => {
    return knex.schema.dropTable("streaks");
  };  