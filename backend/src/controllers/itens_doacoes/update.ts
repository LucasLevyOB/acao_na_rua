import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";

import BaseApiResponse from "../../classes/BaseApiResponse";
import ItemDoacao from "../../models/ItemDoacao";

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { itd_id } = req.params;
        const { id_doacao, itd_nome, itd_quantidade, itd_categoria, itd_validade } = req.body;

        if (!itd_id || !id_doacao || !itd_nome || !itd_quantidade || !itd_categoria || !itd_validade) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const itemDoacao = new ItemDoacao({ itd_id: parseInt(itd_id), id_doacao, itd_nome, itd_quantidade, itd_categoria, itd_validade });

        const updated = await connection("item_doacao").where({ itd_id }).update(itemDoacao);

        if (!updated) {
            const response = new BaseApiResponse({ success: false, message: "Erro ao atualizar item de doação" });
            return res.status(500).json(response);
        }

        const response = new BaseApiResponse({ success: true });
        return res.json(response);

    } catch (error) {
        next(error);
    }
};

export default update;