import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vol_cpf, vol_nome, vol_senha, vol_setor, ong_id } = req.body;

        if (!vol_cpf || !vol_nome || !vol_setor || !vol_senha) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const id_role = 2;

        const [vol_id] = await connection("voluntario").insert({ vol_cpf, vol_nome, id_role, vol_senha, vol_setor });

        if (!vol_id) {
            const response = new BaseApiResponse({ success: false, message: "Erro ao inserir voluntario" });
            return res.status(500).json(response);
        }
        
        // inserir na tabela ong_voluntario
        const [ong_vol_id] = await connection("ong_voluntario").insert({ ong_id, vol_id });

        if (!ong_vol_id) {
            await connection("voluntario").where({ vol_id }).delete();
            const response = new BaseApiResponse({ success: false, message: "Erro ao inserir voluntario" });
            return res.status(500).json(response);
        }

        const response = new BaseApiResponse<{ vol_id: number }>({ success: true, data: { vol_id } });
        return res.json(response);

    } catch (error) {
        next(error);
    }
};

export default create;
