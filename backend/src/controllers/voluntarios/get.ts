import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import Voluntario from "../../models/Voluntario";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params;
        const administrador = await connection("administradores").select('*').where("adm_email", email).first();
        const voluntarios: Voluntario[] = await connection("voluntarios").select('*').distinct().innerJoin("participa", "voluntarios.vol_cpf", "participa.vol_cpf").innerJoin("ongs", "participa.ong_id", "ongs.ong_id").distinct().innerJoin('administrador_ong', 'administrador_ong.adm_id', 'ongs.ong_id').distinct().innerJoin('administradores', 'administradores.adm_id', 'administrador_ong.adm_id').where("administradores.adm_id", administrador.adm_id).distinct();
        const response = new BaseApiResponse<Voluntario[]>({ success: true, data: voluntarios });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;