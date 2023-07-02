import Voluntario from "../models/Voluntario";
import { BaseAPIResponse, TableHeader } from "../types";
import BaseAPI from "./BaseAPI";

export interface CreateVoluntarioPayload {
    vol_cpf: string;
    vol_nome: string;
    vol_senha: string;
    vol_setor: string;
    ong_id: number;
};

export default class VoluntariosService extends BaseAPI {
    protected config() {
        return {
            baseURL: 'http://localhost:3001',
        };
    }

    public async getVoluntarios(): Promise<BaseAPIResponse<Voluntario[]>> {
        try {
            const response = await this.request.get(`/voluntarios/${this.emailCpf}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar Voluntarios",
            }
        }
    }

    public async createVoluntario(payload: CreateVoluntarioPayload): Promise<BaseAPIResponse<{ vol_cpf: string }>> {
        try {
            const response = await this.request.post(`/voluntarios/${this.emailCpf}`, payload);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar Voluntario",
            };
        }
    }

    public getHeaders(): TableHeader[] {
        return [
            {
                title: 'CPF',
                key: 'vol_cpf',
                type: 'text',
                show: true,
            },
            {
                title: 'Nome',
                key: 'vol_nome',
                type: 'text',
                show: true,
            },
            {
                title: 'Setor',
                key: 'vol_setor',
                type: 'text',
                show: true,
            },
            {
                title: 'Ong',
                key: 'ong_nome',
                type: 'text',
                show: true,
            },
            {
                title: 'Data de entrada',
                key: 'vol_data_entrada',
                type: 'date',
                show: true,
            },
            {
                title: 'Data de saída',
                key: 'vol_data_saida',
                type: 'date',
                show: true,
            },
        ]
    }
}