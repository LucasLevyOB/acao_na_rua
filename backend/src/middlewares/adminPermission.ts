import type { NextFunction, Request, Response } from "express";

import connection from "../database/connection";
import BaseApiResponse from "../classes/BaseApiResponse";
import Administrador from "../models/Adminstrador";

const adminPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params;

        if (!email) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const [administrador]: Administrador[] = await connection("administradores").select("*").where({ adm_email: email });

        if (!administrador) {
            const response = new BaseApiResponse({ success: false, message: "Administrador não encontrado" });
            return res.status(404).json(response);
        }

        if (administrador.id_role !== 1) {
            const response = new BaseApiResponse({ success: false, message: "Usuário não é administrador" });
            return res.status(401).json(response);
        }

        next();
    } catch (error) {
        next(error);
    }
}

export default adminPermission;
