/*
table pessoa_situacao_rua {
  pes_id integer [increment]
  pes_nome varchar(120) [not null]
  pes_data_nasc date
  pes_sexo integer
  indexes {
    (pes_id) [pk]
  }
}
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('pessoa_situacao_rua', table => {
        table.increments('pes_id').primary();
        table.string('pes_nome').notNullable();
        table.date('pes_data_nasc');
        table.integer('pes_sexo');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('pessoa_situacao_rua');
};
