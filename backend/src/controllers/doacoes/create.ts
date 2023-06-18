import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";
import ItemDoacao from "../../models/ItemDoacao";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ong_id, doa_cpfcnpj, doa_nome, item_doacao } = req.body;

        if (!ong_id || !doa_cpfcnpj || !doa_nome || !item_doacao) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const itemDoacao = item_doacao as ItemDoacao;

        if (!itemDoacao.itd_nome || !itemDoacao.itd_quantidade || !itemDoacao.itd_categoria || !itemDoacao.itd_validade) {
            const response = new BaseApiResponse({ success: false, message: "Dados inválidos" });
            return res.status(400).json(response);
        }

        const [id_doacao] = await connection("doacao").insert({ ong_id, doa_cpfcnpj, doa_nome });

        if (!id_doacao) {
            const response = new BaseApiResponse({ success: false, message: "Erro ao inserir doação" });
            return res.status(500).json(response);
        }

        const [itd_id] = await connection("item_doacao").insert({ id_doacao, itd_nome: itemDoacao.itd_nome, itd_quantidade: itemDoacao.itd_quantidade, itd_categoria: itemDoacao.itd_categoria, itd_validade: itemDoacao.itd_validade });

        if (!itd_id) {
            await connection("doacao").where({ id_doacao }).delete();
            const response = new BaseApiResponse({ success: false, message: "Erro ao inserir doação" });
            return res.status(500).json(response);
        }

        const response = new BaseApiResponse<{ id_doacao: number }>({ success: true, data: { id_doacao } });
        return res.json(response);

    } catch (error) {
        next(error);
    }
};

export default create;