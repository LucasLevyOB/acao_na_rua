import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";
import Administrador from "../../models/Adminstrador";

const getAdminByVoluntario = async (volCpf: string): Promise<Administrador> => {
  const administrador: Administrador = await connection("voluntarios").select("*").where({ "voluntarios.vol_cpf": volCpf }).innerJoin("participa", "voluntarios.vol_cpf", "participa.vol_cpf").innerJoin("ongs", "participa.ong_id", "ongs.ong_id").innerJoin("administrador_ong", "ongs.ong_id", "administrador_ong.ong_id").innerJoin("administradores", "administrador_ong.adm_id", "administradores.adm_id").first();
  return administrador;
};

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email_cpf } = req.params;

        const isEmail = email_cpf.includes("@");

        const administrador: Administrador = isEmail ? await connection("administradores").select("*").where({ adm_email: email_cpf }).first() : await getAdminByVoluntario(email_cpf);

        if (!administrador) {
            const response = new BaseApiResponse({ success: false, message: "Administrador não encontrado" });
            return res.status(404).json(response);
        }

        const doacoes = await connection("doacao").select("*")
            .innerJoin("item_doacao", "doacao.id_doacao", "item_doacao.id_doacao")
            .innerJoin("ongs", "doacao.ong_id", "ongs.ong_id")
            .innerJoin("administrador_ong", "ongs.ong_id", "administrador_ong.ong_id")
            .innerJoin("administradores", "administrador_ong.adm_id", "administradores.adm_id")
            .where({ "administradores.adm_id": administrador.adm_id });
        const response = new BaseApiResponse({ success: true, data: doacoes });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;