import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import Ong from "../../models/Ong";
import Voluntario from "../../models/Voluntario";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email_cpf } = req.params;

        const [voluntario]: Voluntario[] = await connection("voluntarios").select("*").where({ "voluntarios.vol_cpf": email_cpf });

        const ongs: Ong[] = await connection("ongs").select("*").innerJoin("participa", "ongs.ong_id", "participa.ong_id").innerJoin("voluntarios", "participa.vol_cpf", "voluntarios.vol_cpf").where({ "voluntarios.vol_cpf": voluntario.vol_cpf });
        const response = new BaseApiResponse<Ong[]>({ success: true, data: ongs });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;