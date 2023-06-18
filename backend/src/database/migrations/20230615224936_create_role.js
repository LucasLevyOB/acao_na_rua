/*
table role {
    rol_id integer [pk, increment]
    rol_nome varchar(120) [not null]
}
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('role', table => {
        table.increments('rol_id').primary();
        table.string('rol_nome').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('role');
};
