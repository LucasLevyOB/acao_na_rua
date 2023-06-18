/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('voluntarios', table => {
        table.string('vol_senha').notNullable();
        table.integer('id_role').references('rol_id').inTable('role');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('voluntarios', table => {
        table.dropColumn('vol_senha');
        table.dropColumn('id_role');
    });
};
