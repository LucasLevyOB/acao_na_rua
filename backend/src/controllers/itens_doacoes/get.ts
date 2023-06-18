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

import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import ItemDoacao from "../../models/ItemDoacao";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const itemDoacoes: ItemDoacao[] = await connection("item_doacao").select("*");
        const response = new BaseApiResponse<ItemDoacao[]>({ success: true, data: itemDoacoes });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;