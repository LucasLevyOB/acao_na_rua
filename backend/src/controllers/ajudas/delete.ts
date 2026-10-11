import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";

import BaseApiResponse from "../../classes/BaseApiResponse";
import AppError from "../../classes/Error";
import { devolverAoEstoque } from "./estoque";

const deleteAjuda = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ajd_id } = req.params;

        if (!ajd_id) {
            return res.status(400).json(new BaseApiResponse({ success: false, message: "Dados inválidos" }));
        }

        const deleted = await connection.transaction(async (trx) => {
            const ajuda = await trx("ajudas").where({ ajd_id }).first();

            if (!ajuda) {
                throw new AppError("Ajuda não encontrada", 404);
            }

            await devolverAoEstoque(trx, ajuda.itd_id, ajuda.ajd_qtde_item);
            return trx("ajudas").where({ ajd_id }).delete();
        });

        return res.json(new BaseApiResponse({ success: true, data: { deleted } }));
    } catch (error) {
        next(error);
    }
};

export default deleteAjuda;
