import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import getOngIdsVisiveis from "../../database/ongsVisiveis";
import BaseApiResponse from "../../classes/BaseApiResponse";

import ItemDoacao from "../../models/ItemDoacao";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email_cpf } = req.params;
        const ongIds = await getOngIdsVisiveis(email_cpf);

        const itemDoacoes: ItemDoacao[] = await connection("item_doacao").select("*")
            .innerJoin("doacao", "item_doacao.id_doacao", "doacao.id_doacao")
            .innerJoin("ongs", "doacao.ong_id", "ongs.ong_id")
            .whereIn("ongs.ong_id", ongIds);
        const response = new BaseApiResponse<ItemDoacao[]>({ success: true, data: itemDoacoes });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;
