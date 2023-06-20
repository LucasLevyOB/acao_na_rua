import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cpf, senha } = req.body;

        const [voluntario] = await connection("voluntario").select("*").where({ vol_cpf: cpf, vol_senha: senha });

        if (!voluntario) {
            const response = new BaseApiResponse({ success: false, message: "Voluntário não encontrado" });
            return res.status(404).json(response);
        }

        const token = jwt.sign({ voluntario }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        const response = new BaseApiResponse({ success: true, message: "Voluntário encontrado", data: { auth: voluntario, token } });

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export default login;