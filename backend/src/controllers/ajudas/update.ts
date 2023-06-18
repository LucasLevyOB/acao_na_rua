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

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ajd_id } = req.params;
        const { ong_id, pes_id, itd_id, ajd_qtde_item, ajd_data } = req.body;

        if (!ajd_id || !ong_id || !pes_id || !itd_id || !ajd_qtde_item || !ajd_data) {
            return res.status(400).json({ success: false, message: "Dados inválidos" });
        }

        const updated = await connection("ajuda").where({ ajd_id }).update({ ong_id, pes_id, itd_id, ajd_qtde_item, ajd_data });

        if (!updated) {
            return res.status(500).json({ success: false, message: "Erro ao atualizar ajuda" });
        }

        return res.json({ success: true, data: { updated } });

    } catch (error) {
        next(error);
    }
};

export default update;