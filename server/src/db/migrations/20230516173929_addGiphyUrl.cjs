/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    await knex.schema.alterTable("habits", (table) => {
        table.string("giphy").notNullable();
    });
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    await knex.schema.alterTable("habits", (table) => {
        table.dropColumn("giphy");
    });
}