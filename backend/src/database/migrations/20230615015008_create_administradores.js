/*
    table administrador {
        adm_id integer [pk, increment]
        adm_email varchar(120) [not null]
        adm_nome varchar(120) [not null]
        adm_senha varchar(40) [not null]
        id_role integer [ref: > role.rol_id]
    }
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('administradores', table => {
        table.increments('adm_id').primary();
        table.string('adm_email').notNullable();
        table.string('adm_nome').notNullable();
        table.string('adm_senha').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('administradores');
};
