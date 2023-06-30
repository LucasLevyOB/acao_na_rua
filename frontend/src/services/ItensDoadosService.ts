import BaseAPI from "./BaseAPI";

import ItemDoacao from "../models/ItemDoacao";
import { BaseAPIResponse, TableHeader } from "../types";

export default class ItensDoadosService extends BaseAPI {
    protected config() {
        return {
            baseURL: 'http://localhost:3001',
        };
    }

    public async getItensDoados(): Promise<BaseAPIResponse<ItemDoacao[]>> {
        try {
            const email = this.getAuthEmail();
            const response = await this.request.get(`/itens_doacoes/${email}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar itens doados",
            }
        }
    }

    public getHeaders(): TableHeader[] {
        return [
            {
                title: 'Nome',
                key: 'itd_nome',
                type: 'text',
            },
            {
                title: 'Quantidade',
                key: 'itd_quantidade',
                type: 'number',
            },
            {
                title: 'Categoria',
                key: 'itd_categoria',
                type: 'text',
            },
            {
                title: 'Validade',
                key: 'itd_validade',
                type: 'datetime',
            },
            {
                title: 'Ações',
                key: 'action',
                type: 'custom',
            }
        ];
    }
}