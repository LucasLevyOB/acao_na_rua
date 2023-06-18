import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import BaseApiResponse from "../../classes/BaseApiResponse";

const token = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            const response = new BaseApiResponse({ success: false, message: "Token não informado" });
            return res.status(401).json(response);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!decoded) {
            const response = new BaseApiResponse({ success: false, message: "Token inválido" });
            return res.status(401).json(response);
        }

        const response = new BaseApiResponse({ success: true, message: "Token válido" });
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export default token;