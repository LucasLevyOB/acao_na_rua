/*
table ajuda {
    ajd_id serial
    ong_id integer [ref: > ong.ong_id]
    pes_id integer [ref: > pessoa_situacao_rua.pes_id]
    itd_id integer [ref: > item_doacao.itd_id]
    ajd_qtde_item integer [note: "less than or equal to item_doacao.itd_quantidade"]
    ajd_data date
    indexes {
        (ajd_id, ong_id, pes_id, itd_id) [pk]
    }
}
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ajudas', table => {
        table.increments('ajd_id').primary();
        table.integer('ong_id').references('ong_id').inTable('ongs');
        table.integer('pes_id').references('pes_id').inTable('pessoa_situacao_rua');
        table.integer('itd_id').references('itd_id').inTable('item_doacao');
        table.integer('ajd_qtde_item');
        table.date('ajd_data');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ajudas');
};
