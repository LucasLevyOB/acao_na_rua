import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";

import BaseApiResponse from "../../classes/BaseApiResponse";
import ItemDoacao from "../../models/ItemDoacao";

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { itd_id } = req.params;
        const { itd_nome, itd_quantidade, itd_categoria, itd_validade } = req.body;

        if (!itd_id || !itd_nome || !itd_quantidade || !itd_categoria || !itd_validade) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const updated = await connection("item_doacao").where({ itd_id }).update({ itd_nome, itd_quantidade, itd_categoria, itd_validade });

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