import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doacoes = await connection("doacao").select("*").innerJoin("item_doacao", "doacao.id_doacao", "item_doacao.id_doacao");
        const response = new BaseApiResponse({ success: true, data: doacoes });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;