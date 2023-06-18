import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const administradores = await connection("administradores").select("*");
        const response = new BaseApiResponse({ success: true, data: administradores });
        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;