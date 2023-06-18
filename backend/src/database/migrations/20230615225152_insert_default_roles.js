/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex('role').insert([
        { rol_nome: 'admin' },
        { rol_nome: 'voluntario' },
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex('role').whereIn('rol_nome', ['admin', 'voluntario']).del();
};
