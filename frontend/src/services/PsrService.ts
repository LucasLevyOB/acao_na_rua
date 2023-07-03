import PessoaSituacaoRua from "../models/PessoaSituacaoRua";
import { BaseAPIResponse, TableHeader } from "../types";
import BaseAPI from "./BaseAPI";

type CreatePsrPayload = {
    pes_nome: string;
    pes_data_nasc: Date;
    pes_sexo: number;
  };

export default class PsrService extends BaseAPI {
    protected config() {
        return {
            baseURL: 'http://localhost:3001',
        };
    }

    public async getPsr(): Promise<BaseAPIResponse<PessoaSituacaoRua[]>> {
        try {
            const response = await this.request.get(`/pessoas_situacao_rua/${this.emailCpf}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar Psr",
            }
        }
    }

    public async createPsr(payload: CreatePsrPayload): Promise<BaseAPIResponse<{ pes_id: number }>> {
        try {
            const response = await this.request.post(`/pessoas_situacao_rua/${this.emailCpf}`, payload);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar Psr",
            };
        }
    }

    public getHeaders(): TableHeader[] {
        return [
            {
                title: 'ID',
                key: 'pes_id',
                type: 'number',
                show: false,
            },
            {
                title: 'Nome',
                key: 'pes_nome',
                type: 'text',
                show: true,
            },
            {
                title: 'Data de Nascimento',
                key: 'pes_data_nasc',
                type: 'date',
                show: true,
            },
            {
                title: 'Sexo',
                key: 'pes_sexo',
                type: 'number',
                show: true,
            },
        ];
    }
}