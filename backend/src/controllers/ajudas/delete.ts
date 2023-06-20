/*
table ajuda {
    ajd_id serial
    ong_id integer [ref: > ong.ong_id]
    pes_id integer [ref: > pessoa_situacao_rua.pes_id]
    itd_id integer [ref: > item_doacao.itd_id]
    ajd_qtde_item integer [note: "less than or equal to item_doacao.itd_quantidade"]
    ajd_data date
    indexes {
        (ajd_id, ong_id, pes_id, itd_id) [pk]
    }
}
*/

import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";

import BaseApiResponse from "../../classes/BaseApiResponse";

const deleteAjuda = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ajd_id } = req.params;

        if (!ajd_id) {
            return res.status(400).json({ success: false, message: "Dados inválidos" });
        }

        const ajuda = await connection("ajudas").where({ ajd_id }).first();
        const deleted = await connection("ajudas").where({ ajd_id }).delete();

        if (!deleted) {
            return res.status(500).json({ success: false, message: "Erro ao excluir ajuda" });
        }

        const itemDoacao = await connection("item_doacao").where({ itd_id: ajuda.itd_id }).first();
        const updatedItemDoacao = await connection("item_doacao").where({ itd_id: ajuda.itd_id }).update({ itd_quantidade: itemDoacao.itd_quantidade + ajuda.ajd_qtde_item });

        return res.json({ success: true, data: { deleted } });

    } catch (error) {
        next(error);
    }
};

export default deleteAjuda;