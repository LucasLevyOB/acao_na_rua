import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";

import BaseApiResponse from "../../classes/BaseApiResponse";
import Ajuda from "../../models/Ajuda";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ajudas: Ajuda[] = await connection("ajudas").select("*");
        const response = new BaseApiResponse<Ajuda[]>({ success: true, data: ajudas });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;