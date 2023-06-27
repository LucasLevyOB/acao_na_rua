import Administrador from "../../../models/Adminstrador";
import Voluntario from "../../../models/Voluntario";
import BaseAPI from "../../../services/BaseAPI";
import { BaseAPIResponse } from "../../../types";

export default class AuthService extends BaseAPI {
    protected config() {
        return {
            baseURL: "http://localhost:3001/auth",
        };
    }

    public async login(emailCpf: string, senha: string): Promise<BaseAPIResponse<{ auth: Administrador | Voluntario, token: string }>> {
        try {
            const isEmail = emailCpf.includes("@");
            const emailCpfObject = { [isEmail ? 'email' : 'cpf']: emailCpf };

            const response = await this.request.post("/login", { ...emailCpfObject, senha });

            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao fazer login",
            };
        }
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