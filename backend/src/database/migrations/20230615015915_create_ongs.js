/*
table ong {
  ong_id  integer [pk, increment]
  ong_nome varchar(120) [not null]
  ong_razao_social varchar(120) [not null]
}
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ongs', table => {
        table.increments('ong_id').primary();
        table.string('ong_nome').notNullable();
        table.string('ong_razao_social').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
