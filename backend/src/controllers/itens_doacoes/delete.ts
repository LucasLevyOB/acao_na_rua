import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";

import BaseApiResponse from "../../classes/BaseApiResponse";
import AppError from "../../classes/Error";

const deleteItemDoacao = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { itd_id } = req.params;

        if (!itd_id) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        await connection.transaction(async (trx) => {
            const item = await trx("item_doacao").where({ itd_id }).first();

            if (!item) {
                throw new AppError("Item de doação não encontrado", 404);
            }

            // Excluir um item já usado em ajudas deixaria essas ajudas órfãs (somem da listagem).
            const ajudaVinculada = await trx("ajudas").where({ itd_id }).first();

            if (ajudaVinculada) {
                throw new AppError("Item de doação possui ajudas vinculadas; exclua as ajudas antes", 409);
            }

            await trx("item_doacao").where({ itd_id }).delete();

            const outroItem = await trx("item_doacao").where({ id_doacao: item.id_doacao }).first();

            if (!outroItem) {
                await trx("doacao").where({ id_doacao: item.id_doacao }).delete();
            }
        });

        const response = new BaseApiResponse({ success: true });
        return res.json(response);

    } catch (error) {
        next(error);
    }
};

export default deleteItemDoacao;
