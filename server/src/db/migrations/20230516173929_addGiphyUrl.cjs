/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    knex.schema.alterTable("habits", (table) => {
        table.string("giphyUrl").notNullable();
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    knex.schema.alterTable("habits", (table) => {
        table.dropColumn("giphyUrl");
    })
}
