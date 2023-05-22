/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    await knex.schema.alterTable("habits", (table) => {
        table.string("streakType").notNullable().defaultTo("daily");
    });
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("habits", (table) => {
        table.dropColumn("streakType");
    });
}