import Ong from "../models/Ong";
import type { BaseAPIResponse } from "../types";
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

    public async getOngsByAdmin(admId: number): Promise<BaseAPIResponse<Ong[]>> {
        try {
            const response = await this.request.get('/ongs', { params: { adm_id: admId } });
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
            const response = await this.request.post('/ongs', payload);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar ONG",
            };
        }
    }
}