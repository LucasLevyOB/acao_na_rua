import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";
import getOngIdsVisiveis from "../../database/ongsVisiveis";

import BaseApiResponse from "../../classes/BaseApiResponse";
import Ajuda from "../../models/Ajuda";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email_cpf } = req.params;
        const ongIds = await getOngIdsVisiveis(email_cpf);

        const ajudas: Ajuda[] = await connection("ajudas").select("*")
          .innerJoin("pessoa_situacao_rua", "pessoa_situacao_rua.pes_id", "ajudas.pes_id")
          .innerJoin("item_doacao", "item_doacao.itd_id", "ajudas.itd_id")
          .innerJoin("doacao", "item_doacao.id_doacao", "doacao.id_doacao")
          .innerJoin("ongs", "doacao.ong_id", "ongs.ong_id")
          .whereIn("ongs.ong_id", ongIds);
        const response = new BaseApiResponse<Ajuda[]>({ success: true, data: ajudas });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;
