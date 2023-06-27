import BaseAPI from "../../../services/BaseAPI";
import { BaseAPIResponse } from "../../../types";

export interface CreateAdministradorPayload {
    adm_nome: string;
    adm_email: string;
    adm_senha: string;
}

export default class AdministradorService extends BaseAPI {
    protected config() {
        return {
            baseURL: "http://localhost:3001" 
        };
    }

    public async create(administrador: CreateAdministradorPayload): Promise<BaseAPIResponse<{ adm_id: number }>> {
        try {
            const response = await this.request.post("/administradores", administrador);

            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar administrador",
            };
        }
    }
}