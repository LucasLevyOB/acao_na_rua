import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import getOngIdsVisiveis from "../../database/ongsVisiveis";
import BaseApiResponse from "../../classes/BaseApiResponse";

import Voluntario from "../../models/Voluntario";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params;
        const ongIds = await getOngIdsVisiveis(email);

        const voluntarios: Voluntario[] = await connection("voluntarios").select("voluntarios.*", "participa.*", "ongs.*")
            .innerJoin("participa", "voluntarios.vol_cpf", "participa.vol_cpf")
            .innerJoin("ongs", "participa.ong_id", "ongs.ong_id")
            .whereIn("ongs.ong_id", ongIds);
        const response = new BaseApiResponse<Voluntario[]>({ success: true, data: voluntarios });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;
