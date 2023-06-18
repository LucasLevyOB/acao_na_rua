/*
table doacao {
    id_doacao integer [pk, increment]
    ong_id integer [ref: > ong.ong_id]
    doa_cpfcnpj varchar(14)
    doa_nome varchar(128)
    doa_data date [default: `now()`]
}
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('doacao', table => {
        table.increments('id_doacao').primary();
        table.integer('ong_id').unsigned().notNullable();
        table.foreign('ong_id').references('ong_id').inTable('ong');
        table.string('doa_cpfcnpj', 14).notNullable();
        table.string('doa_nome', 128).notNullable();
        table.date('doa_data').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('doacao');
};
