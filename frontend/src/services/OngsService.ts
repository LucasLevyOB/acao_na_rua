import Ong from "../models/Ong";
import type { BaseAPIResponse } from "../types";
import BaseAPI from "./BaseAPI";

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
}