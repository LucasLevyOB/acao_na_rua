/*
table participa {
    ong_id integer [ref: > ong.ong_id]
    vol_cpf varchar(14) [ref: > voluntario.vol_cpf]
    par_data_entrada date [default: `now()`]
    par_data_saida date
    indexes {
        (ong_id, vol_cpf) [pk]
    }
}
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('participa', table => {
        table.integer('ong_id').references('ong_id').inTable('ongs');
        table.string('vol_cpf').references('vol_cpf').inTable('voluntarios');
        table.date('par_data_entrada').defaultTo(knex.fn.now());
        table.date('par_data_saida');
        table.primary(['ong_id', 'vol_cpf']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('participa');
};
