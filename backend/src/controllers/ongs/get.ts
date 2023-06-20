import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import Ong from "../../models/Ong";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ongs: Ong[] = await connection("ongs").select("*");
        const response = new BaseApiResponse<Ong[]>({ success: true, data: ongs });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;