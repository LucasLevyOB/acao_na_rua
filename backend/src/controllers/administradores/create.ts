import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { adm_nome, adm_email, adm_senha } = req.body;
        const id_role = 1;

        if (!adm_nome || !adm_email || !adm_senha) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const [adm_id] = await connection("administradores").insert({ adm_nome, adm_email, adm_senha, id_role });

        if (!adm_id) {
            const response = new BaseApiResponse({ success: false, message: "Erro ao inserir administrador" });
            return res.status(500).json(response);
        }

        const response = new BaseApiResponse<{ adm_id: number }>({ success: true, data: { adm_id } });
        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default create;