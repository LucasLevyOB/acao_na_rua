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

/*
table doacao {
    id_doacao integer [pk, increment]
    ong_id integer [ref: > ong.ong_id]
    doa_cpfcnpj varchar(14)
    doa_nome varchar(128)
    doa_data date [default: `now()`]
}
*/

/*
table item_doacao {
    itd_id integer [pk, increment]
    id_doacao integer [ref: > doacao.id_doacao]
    itd_nome varchar(120) [not null]
    itd_quantidade integer [default: 1]
    itd_categoria varchar(120)
    itd_validade date
}
*/

// crie o body de uma requisição POST para o endpoint /doacoes com os seguintes dados:
// {
//     "ong_id": 1,
//     "doa_cpfcnpj": "12345678901",
//     "doa_nome": "Francisco da Silva",
    // "item_doacao": {
    //     "itd_nome": "Arroz",
    //     "itd_quantidade": 10,
    //     "itd_categoria": "Alimentos",
    //     "itd_validade": "2021-12-31T00:00:00.000Z"
    // }
// }
