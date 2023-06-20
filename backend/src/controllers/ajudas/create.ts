import type { NextFunction, Request, Response } from "express";
import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ong_id, pes_id, itd_id, ajd_qtde_item, ajd_data } = req.body;

        if (!ong_id || !pes_id || !itd_id || !ajd_qtde_item || !ajd_data) {
            return res.status(400).json({ success: false, message: "Dados inválidos" });
        }

        const ajuda = await connection("ajudas").insert({ ong_id, pes_id, itd_id, ajd_qtde_item, ajd_data });

        if (!ajuda) {
            return res.status(500).json({ success: false, message: "Erro ao inserir ajuda" });
        }

        // diminuir a quantidade de itens doados
        const itemDoacao = await connection("item_doacao").where({ itd_id }).first();
        const updated = await connection("item_doacao").where({ itd_id }).update({ itd_quantidade: itemDoacao.itd_quantidade - ajd_qtde_item });

        if (!updated) {
            const response = new BaseApiResponse({ success: true, message: "Ajuda inserida com sucesso, porém houve um erro ao dimnuir o item do banco, faça isso manuamente." });
            return res.status(500).json(response);
        }

        return res.json({ success: true, data: { ajuda } });

    } catch (error) {
        next(error);
    }
};

export default create;

/*
table ajuda {
    ajd_id serial
    ong_id integer [ref: > ong.ong_id]
    pes_id integer [ref: > pessoa_situacao_rua.pes_id]
    itd_id integer [ref: > item_doacao.itd_id]
    ajd_qtde_item integer [note: "less than or equal to item_doacao.itd_quantidade"]
    ajd_data date
    indexes {
        (ajd_id, ong_id, pes_id, itd_id) [pk]
    }
}
*/

// crie uma chama para a rota de ajuda, criando a seguinte ajuda:
// {
//     "ong_id": 1,
//     "pes_id": 1,
//     "itd_id": 2,
//     "ajd_qtde_item": 4,
//     "ajd_data": "2023-06-20 04:01:50"
// }