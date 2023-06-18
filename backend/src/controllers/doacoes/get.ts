import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import Doacao from "../../models/Doacao";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doacoes: Doacao[] = await connection("doacao").select("*");
        const response = new BaseApiResponse<Doacao[]>({ success: true, data: doacoes });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;