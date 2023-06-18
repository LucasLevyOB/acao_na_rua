import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ong_id, pes_id, itd_id, ajd_qtde_item, ajd_data } = req.body;

        if (!ong_id || !pes_id || !itd_id || !ajd_qtde_item || !ajd_data) {
            return res.status(400).json({ success: false, message: "Dados inválidos" });
        }

        const ajuda = await connection("ajuda").insert({ ong_id, pes_id, itd_id, ajd_qtde_item, ajd_data });

        if (!ajuda) {
            return res.status(500).json({ success: false, message: "Erro ao inserir ajuda" });
        }

        return res.json({ success: true, data: { ajuda } });

    } catch (error) {
        next(error);
    }
};

export default create;