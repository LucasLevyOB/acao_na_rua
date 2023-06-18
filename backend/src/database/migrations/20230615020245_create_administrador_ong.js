
/*
table administrador_ong {
  ong_id integer [ref: > ong.ong_id]
  adm_id integer [ref: > administrador.adm_id]
}
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('administrador_ong', table => {
        table.integer('ong_id').references('ong_id').inTable('ongs');
        table.integer('adm_id').references('adm_id').inTable('administradores');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('administrador_ong');
};
