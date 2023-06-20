import type { NextFunction, Request, Response } from "express";

import connection from "../database/connection";
import BaseApiResponse from "../classes/BaseApiResponse";
import Voluntario from "../models/Voluntario";
import Administrador from "../models/Adminstrador";

const voluntarioPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email_cpf } = req.params;

        if (!email_cpf) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const [voluntario]: Voluntario[] = await connection("voluntarios").select("*").where({ vol_cpf: email_cpf });
        const [administrador]: Administrador[] = await connection("administradores").select("*").where({ adm_email: email_cpf });

        if (!voluntario && !administrador) {
            const response = new BaseApiResponse({ success: false, message: "Usuário não encontrado" });
            return res.status(404).json(response);
        }

        if (voluntario) {
            if (voluntario.id_role !== 2) {
                const response = new BaseApiResponse({ success: false, message: "Usuário não é voluntário" });
                return res.status(401).json(response);
            }
        }

        if (administrador) {
            if (administrador.id_role !== 1) {
                const response = new BaseApiResponse({ success: false, message: "Usuário não é administrador" });
                return res.status(401).json(response);
            }
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default voluntarioPermission;
