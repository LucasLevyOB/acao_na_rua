import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";

import BaseApiResponse from "../../classes/BaseApiResponse";

const deleteItemDoacao = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { itd_id } = req.params;

        if (!itd_id) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const itemDoacao = await connection("item_doacao").where({ itd_id }).delete();

        if (!itemDoacao) {
            const response = new BaseApiResponse({ success: false, message: "Erro ao deletar item de doação" });
            return res.status(500).json(response);
        }

        const response = new BaseApiResponse({ success: true });
        return res.json(response);

    } catch (error) {
        next(error);
    }
};

export default deleteItemDoacao;