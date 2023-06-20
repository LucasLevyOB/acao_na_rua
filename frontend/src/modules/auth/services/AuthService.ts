import BaseAPI from "../../../services/BaseAPI";
import { BaseAPIResponse } from "../../../types";

export default class AuthService extends BaseAPI {
    protected config() {
        return {
            baseURL: "http://localhost:3001/auth",
        };
    }

    async isValidtoken(): Promise<BaseAPIResponse<undefined>> {
        try {
            const response = await this.request.get("/token");
    
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao validar token",
            };
        }
    }
}