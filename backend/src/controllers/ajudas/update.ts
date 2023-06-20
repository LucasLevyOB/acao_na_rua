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

        const ajuda = await connection("ajudas").where({ ajd_id }).first();
        const updated = await connection("ajudas").where({ ajd_id }).update({ ong_id, pes_id, itd_id, ajd_qtde_item, ajd_data });

        if (!updated) {
            return res.status(500).json({ success: false, message: "Erro ao atualizar ajuda" });
        }

        const itemDoacao = await connection("item_doacao").where({ itd_id }).first();
        const updatedItemDoacao = await connection("item_doacao").where({ itd_id }).update({ itd_quantidade: itemDoacao.itd_quantidade + ajuda.ajd_qtde_item - ajd_qtde_item });

        if (!updatedItemDoacao) {
            const response = new BaseApiResponse({ success: true, message: "Ajuda atualizada com sucesso, porém houve um erro ao atualizar o item do banco, faça isso manuamente." });
            return res.status(500).json(response);
        }

        return res.json({ success: true, data: { updated } });

    } catch (error) {
        next(error);
    }
};

export default update;