import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import Role from "../../models/Role";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await connection("role").select("*");
        const response = new BaseApiResponse<Role[]>({ success: true, data: roles });
        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;