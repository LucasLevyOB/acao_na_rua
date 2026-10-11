import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vol_cpf, vol_nome, vol_senha, vol_setor, ong_id } = req.body;

        if (!vol_cpf || !vol_nome || !vol_setor || !vol_senha || !ong_id) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const id_role = 2;

        await connection.transaction(async (trx) => {
            await trx("voluntarios").insert({ vol_cpf, vol_nome, id_role, vol_senha, vol_setor });
            await trx("participa").insert({ ong_id, vol_cpf });
        });

        const response = new BaseApiResponse<{ vol_cpf: string }>({ success: true, data: { vol_cpf } });
        return res.json(response);

    } catch (error) {
        next(error);
    }
};

export default create;
