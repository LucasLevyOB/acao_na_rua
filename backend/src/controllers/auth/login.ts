import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const [administrador] = await connection("administradores").select("*").where({ adm_email: email, adm_senha: senha });

        if (!administrador) {
            const response = new BaseApiResponse({ success: false, message: "Administrador não encontrado" });
            return res.status(404).json(response);
        }

        const token = jwt.sign({ administrador }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        const response = new BaseApiResponse({ success: true, message: "Administrador encontrado", data: { auth: administrador, token } });
        
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export default login;