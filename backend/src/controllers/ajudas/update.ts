import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";

import BaseApiResponse from "../../classes/BaseApiResponse";
import AppError from "../../classes/Error";
import { devolverAoEstoque, isQuantidadeValida, retirarDoEstoque } from "./estoque";

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ajd_id } = req.params;
        const { ong_id, pes_id, itd_id, ajd_qtde_item, ajd_data } = req.body;

        if (!ajd_id || !ong_id || !pes_id || !itd_id || !ajd_data || !isQuantidadeValida(ajd_qtde_item)) {
            return res.status(400).json(new BaseApiResponse({ success: false, message: "Dados inválidos" }));
        }

        const quantidade = Number(ajd_qtde_item);

        const updated = await connection.transaction(async (trx) => {
            const ajuda = await trx("ajudas").where({ ajd_id }).first();

            if (!ajuda) {
                throw new AppError("Ajuda não encontrada", 404);
            }

            // Devolve a quantidade ao item original antes de debitar do (possivelmente novo) item,
            // assim a troca de item na edição não corrompe o estoque de nenhum dos dois.
            await devolverAoEstoque(trx, ajuda.itd_id, ajuda.ajd_qtde_item);
            await retirarDoEstoque(trx, itd_id, quantidade);

            return trx("ajudas").where({ ajd_id }).update({ ong_id, pes_id, itd_id, ajd_qtde_item: quantidade, ajd_data });
        });

        return res.json(new BaseApiResponse({ success: true, data: { updated } }));
    } catch (error) {
        next(error);
    }
};

export default update;
