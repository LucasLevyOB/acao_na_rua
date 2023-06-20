import type { NextFunction, Request, Response } from "express";

import connection from "../../database/connection";
import BaseApiResponse from "../../classes/BaseApiResponse";

import PessoaSituacaoRua from "../../models/PessoaSituacaoRua";

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pessoasSituacaoRua: PessoaSituacaoRua[] = await connection("pessoa_situacao_rua").select("*");
        const response = new BaseApiResponse<PessoaSituacaoRua[]>({ success: true, data: pessoasSituacaoRua });

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default get;