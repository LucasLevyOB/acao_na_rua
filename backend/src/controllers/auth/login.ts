import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import loginAdministrador from "./administrador";
import loginVoluntario from "./voluntario";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, cpf, senha } = req.body;

        const isAdministrador = email && senha;
        const isVoluntario = cpf && senha;

        if (!isAdministrador && !isVoluntario) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        if (isAdministrador) {
            return await loginAdministrador(req, res, next);
        }

        if (isVoluntario) {
            return await loginVoluntario(req, res, next);
        }

        // const [administrador] = await connection("administradores").select("*").where({ adm_email: email, adm_senha: senha });

        // if (!administrador) {
        //     const response = new BaseApiResponse({ success: false, message: "Administrador não encontrado" });
        //     return res.status(404).json(response);
        // }

        // const token = jwt.sign({ administrador }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        // const response = new BaseApiResponse({ success: true, message: "Administrador encontrado", data: { auth: administrador, token } });
        
        // return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export default login;