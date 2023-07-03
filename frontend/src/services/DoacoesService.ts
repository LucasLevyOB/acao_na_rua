import Doacao from "../models/Doacao";
import { BaseAPIResponse, TableHeader } from "../types";
import BaseAPI from "./BaseAPI";

export interface CreateDoacaoPayload {
    ong_id: string;
    doa_nome: string;
    doa_cpfcnpj: string;
    item_doacao: {
        itd_nome: string;
        itd_quantidade: number;
        itd_categoria: string;
        itd_validade: string;
    };
}

export interface EditDoacaoPayload {
    doa_nome: string;
    doa_cpfcnpj: string;
    doa_data: string;
}

export default class DoacoesService extends BaseAPI {
    protected config() {
        return {
            baseURL: 'http://localhost:3001',
        };
    }

    public async getDoacoes(): Promise<BaseAPIResponse<Doacao[]>> {
        try {
            const response = await this.request.get(`/doacoes/${this.emailCpf}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar Doações",
            }
        }
    }

    public async createDoacao(payload: CreateDoacaoPayload): Promise<BaseAPIResponse<{ id_doacao: number }>> {
        try {
            const response = await this.request.post(`/doacoes/${this.emailCpf}`, payload);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar Doação",
            };
        }
    }

    public getHeaders(): TableHeader[] {
        return [
            {
                title: 'ID',
                key: 'id_doacao',
                type: 'number',
                show: false,
            },
            {
                title: 'Nome',
                key: 'doa_nome',
                type: 'text',
                show: true,
            },
            {
                title: 'CPF/CNPJ',
                key: 'doa_cpfcnpj',
                type: 'text',
                show: true,
            },
            {
                title: 'ONG',
                key: 'ong_nome',
                type: 'text',
                show: true,
            },
            {
                title: 'Item',
                key: 'itd_nome',
                type: 'text',
                show: true,
            },
            {
                title: 'Quantidade',
                key: 'itd_quantidade',
                type: 'number',
                show: true,
            },
            {
                title: 'Categoria',
                key: 'itd_categoria',
                type: 'text',
                show: true,
            },
            {
                title: 'Validade',
                key: 'itd_validade',
                type: 'date',
                show: true,
            },
        ];
    }
}
