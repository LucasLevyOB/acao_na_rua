/*
table voluntario {
    vol_cpf varchar(14) [pk]
    vol_nome varchar(128)
    vol_setor varchar(120)
    vol_data_entrada date [default: `now()`]
    vol_data_saida date
}
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('voluntarios', table => {
        table.string('vol_cpf').primary();
        table.string('vol_nome');
        table.string('vol_setor');
        table.date('vol_data_entrada').defaultTo(knex.fn.now());
        table.date('vol_data_saida');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('voluntarios');
};
