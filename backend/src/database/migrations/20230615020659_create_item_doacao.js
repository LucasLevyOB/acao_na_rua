/*
table item_doacao {
    itd_id integer [pk, increment]
    id_doacao integer [ref: > doacao.id_doacao]
    itd_nome varchar(120) [not null]
    itd_quantidade integer [default: 1]
    itd_categoria varchar(120)
    itd_validade date
}
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('item_doacao', table => {
        table.increments('itd_id').primary();
        table.integer('id_doacao').references('id_doacao').inTable('doacao');
        table.string('itd_nome').notNullable();
        table.integer('itd_quantidade').defaultTo(1);
        table.string('itd_categoria');
        table.date('itd_validade');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('item_doacao');
};
