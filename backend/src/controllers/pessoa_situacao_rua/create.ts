import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pes_nome, pes_data_nasc, pes_sexo } = req.body;

        if (!pes_nome || !pes_data_nasc || !pes_sexo || typeof pes_nome !== "string" || typeof pes_data_nasc !== "string" || typeof pes_sexo !== "number") {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const [pes_id] = await connection("pessoa_situacao_rua").insert({ pes_nome, pes_data_nasc, pes_sexo });

        if (!pes_id) {
            const response = new BaseApiResponse({ success: false, message: "Erro ao inserir pessoa" });
            return res.status(500).json(response);
        }

        const response = new BaseApiResponse<{ pes_id: number }>({ success: true, data: { pes_id } });
        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default create;
