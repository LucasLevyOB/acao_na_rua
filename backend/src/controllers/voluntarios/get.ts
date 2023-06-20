import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import Voluntario from "../../models/Voluntario";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ong_id } = req.params;

        const voluntarios: Voluntario[] = await connection("voluntarios").select(['voluntarios.vol_cpf', 'voluntarios.vol_nome', 'voluntarios.vol_setor', 'voluntarios.vol_data_entrada', 'voluntarios.vol_data_saida']).innerJoin("participa", "voluntarios.vol_cpf", "participa.vol_cpf").innerJoin("ongs", "participa.ong_id", "ongs.ong_id").where({ "ongs.ong_id": ong_id });
        const response = new BaseApiResponse<Voluntario[]>({ success: true, data: voluntarios });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;