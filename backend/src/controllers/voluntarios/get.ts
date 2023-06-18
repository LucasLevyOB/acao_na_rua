import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import Voluntario from "../../models/Voluntario";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const voluntarios: Voluntario[] = await connection("voluntarios").select("*");
        const response = new BaseApiResponse<Voluntario[]>({ success: true, data: voluntarios });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;