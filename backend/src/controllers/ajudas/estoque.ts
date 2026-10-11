import type { Knex } from "knex";

import AppError from "../../classes/Error";

export const isQuantidadeValida = (quantidade: unknown): boolean => {
    const valor = Number(quantidade);
    return Number.isInteger(valor) && valor > 0;
};

// Débito atômico: o UPDATE só afeta a linha se houver estoque suficiente,
// evitando que duas requisições simultâneas deixem a quantidade negativa.
export const retirarDoEstoque = async (trx: Knex.Transaction, itd_id: number, quantidade: number) => {
    const atualizados = await trx("item_doacao")
        .where({ itd_id })
        .andWhere("itd_quantidade", ">=", quantidade)
        .decrement("itd_quantidade", quantidade);

    if (atualizados) return;

    const item = await trx("item_doacao").where({ itd_id }).first();

    if (!item) {
        throw new AppError("Item de doação não encontrado", 404);
    }

    throw new AppError(`Estoque insuficiente: disponível ${item.itd_quantidade}, solicitado ${quantidade}`, 409);
};

export const devolverAoEstoque = async (trx: Knex.Transaction, itd_id: number, quantidade: number) => {
    const atualizados = await trx("item_doacao").where({ itd_id }).increment("itd_quantidade", quantidade);

    if (!atualizados) {
        throw new AppError("Item de doação não encontrado", 404);
    }
};
