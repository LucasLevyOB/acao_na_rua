import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import Ong from "../../models/Ong";
import Administrador from "../../models/Adminstrador";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params;

        const [administrador]: Administrador[] = await connection("administradores").select("*").where({ adm_email: email });

        const ongs: Ong[] = await connection("ongs").select("*").innerJoin("administrador_ong", "ongs.ong_id", "administrador_ong.ong_id").innerJoin("administradores", "administrador_ong.adm_id", "administradores.adm_id").where({ "administradores.adm_id": administrador.adm_id });
        const response = new BaseApiResponse<Ong[]>({ success: true, data: ongs });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;