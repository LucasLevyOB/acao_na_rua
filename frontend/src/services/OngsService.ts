import Ong from "../models/Ong";
import { useAuthStore } from "../modules/auth/stores/authStore";
import type { BaseAPIResponse, TableHeader } from "../types";
import BaseAPI from "./BaseAPI";

export interface CreateOngPayload {
    ong_nome: string;
    ong_razao_social: string;
    adm_id: number;
};

export default class OngsService extends BaseAPI {
    protected config() {
        return {
            baseURL: 'http://localhost:3001',
        };
    }

    public async getOngs(): Promise<BaseAPIResponse<Ong[]>> {
        try {
            const response = await this.request.get('/ongs');
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar ONGs",
            }
        }
    }

    public async getOngsByAdmin(): Promise<BaseAPIResponse<Ong[]>> {
        try {
            const response = await this.request.get(`/ongs/${this.emailCpf}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar ONGs",
            }
        }
    }

    public async getOngsByVoluntario(): Promise<BaseAPIResponse<Ong[]>> {
        try {
            const response = await this.request.get(`/ongs/by-voluntario/${this.emailCpf}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar ONGs",
            }
        }
    }

    public async createOng(payload: CreateOngPayload): Promise<BaseAPIResponse<{ ong_id: number }>> {
        try {
            const response = await this.request.post(`/ongs/${this.emailCpf}`, payload);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar ONG",
            };
        }
    }

    public getHeaders(): TableHeader[] {
        return [
            {
                align: 'start',
                key: 'ong_nome',
                sortable: false,
                title: 'Nome',
                type: 'text',
                show: true,
            },
            {
                align: 'start',
                key: 'ong_razao_social',
                sortable: false,
                title: 'Razão Social',
                type: 'text',
                show: true,
            }
        ]
    }
};
