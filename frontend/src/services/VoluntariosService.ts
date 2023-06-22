import Voluntario from "../models/Voluntario";
import { BaseAPIResponse } from "../types";
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

    public async getVoluntarios(ongId: number): Promise<BaseAPIResponse<Voluntario[]>> {
        try {
            const response = await this.request.get('/voluntarios', { params: { ong_id: ongId } });
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
            const response = await this.request.post('/voluntarios', payload);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar Voluntario",
            };
        }
    }


}