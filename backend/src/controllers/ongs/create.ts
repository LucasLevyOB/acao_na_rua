import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ong_nome, ong_razao_social, adm_id } = req.body;

        if (!ong_nome || !ong_razao_social || !adm_id) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const [ong_id] = await connection("ongs").insert({ ong_nome, ong_razao_social });

        if (!ong_id) {
            const response = new BaseApiResponse({ success: false, message: "Erro ao inserir ong" });
            return res.status(500).json(response);
        }

        const [adm_ong_id] = await connection("administrador_ong").insert({ adm_id, ong_id });

        if (!adm_ong_id) {
            await connection("ongs").where({ ong_id }).delete();
            const response = new BaseApiResponse({ success: false, message: "Erro ao inserir ong" });
            return res.status(500).json(response);
        }

        const response = new BaseApiResponse<{ ong_id: number }>({ success: true, data: { ong_id } });
        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default create;
