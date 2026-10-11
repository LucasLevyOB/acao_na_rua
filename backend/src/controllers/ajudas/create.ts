import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";
import { isQuantidadeValida, retirarDoEstoque } from "./estoque";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ong_id, pes_id, itd_id, ajd_qtde_item, ajd_data } = req.body;

        if (!ong_id || !pes_id || !itd_id || !ajd_data || !isQuantidadeValida(ajd_qtde_item)) {
            return res.status(400).json(new BaseApiResponse({ success: false, message: "Dados inválidos" }));
        }

        const quantidade = Number(ajd_qtde_item);

        const ajuda = await connection.transaction(async (trx) => {
            await retirarDoEstoque(trx, itd_id, quantidade);
            return trx("ajudas").insert({ ong_id, pes_id, itd_id, ajd_qtde_item: quantidade, ajd_data });
        });

        return res.json(new BaseApiResponse({ success: true, data: { ajuda } }));
    } catch (error) {
        next(error);
    }
};

export default create;
