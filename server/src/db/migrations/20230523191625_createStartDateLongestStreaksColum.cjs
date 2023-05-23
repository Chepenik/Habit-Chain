/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
     await knex.schema.alterTable("streaks", (table) => {
        table.timestamp("startDate").notNullable().defaultTo(knex.fn.now());
        table.bigInteger("longestStreak").defaultTo(0);
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("streaks", (table) => {
        table.dropColumn("startDate");
        table.dropColumn("longestStreak");
    });
}