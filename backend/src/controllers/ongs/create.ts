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

        const ong_id = await connection.transaction(async (trx) => {
            const [ong_id] = await trx("ongs").insert({ ong_nome, ong_razao_social });
            await trx("administrador_ong").insert({ adm_id, ong_id });
            return ong_id;
        });

        const response = new BaseApiResponse<{ ong_id: number }>({ success: true, data: { ong_id } });
        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default create;
