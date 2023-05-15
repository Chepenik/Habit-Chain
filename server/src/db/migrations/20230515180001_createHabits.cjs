/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    await knex.schema.createTable("habits", (table) => {
        table.bigIncrements("id").primary();
        table.string("name").notNullable();
        table.string("reduceFriction").notNullable();
        table.string("why").notNullable();
        table.bigInteger("userId").references("users.id").notNullable().index().unsigned()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());;
    });
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("habits");
}