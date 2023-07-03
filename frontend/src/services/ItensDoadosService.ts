import BaseAPI from "./BaseAPI";

import ItemDoacao from "../models/ItemDoacao";
import { BaseAPIResponse, TableHeader } from "../types";

type UpdateItemDoacaoPayload = {
    itd_nome: string;
    itd_quantidade: number;
    itd_categoria: string;
    itd_validade: string;
  };

export default class ItensDoadosService extends BaseAPI {
    protected config() {
        return {
            baseURL: 'http://localhost:3001',
        };
    }

    public async getItensDoados(): Promise<BaseAPIResponse<ItemDoacao[]>> {
        try {
            const response = await this.request.get(`/itens_doacoes/${this.emailCpf}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar itens doados",
            }
        }
    }

    public async editItemDoacao(itdId: number, payload: UpdateItemDoacaoPayload): Promise<BaseAPIResponse<{}>> {
        try {
            const response = await this.request.put(`/itens_doacoes/${this.emailCpf}/${itdId}`, payload);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao editar item doado",
            };
        }
    }

    public async deleteItemDoacao(itdId: number): Promise<BaseAPIResponse<{}>> {
        try {
            const response = await this.request.delete(`/itens_doacoes/${this.emailCpf}/${itdId}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao editar item doado",
            };
        }
    }

    public getHeaders(): TableHeader[] {
        return [
            {
                title: 'ID',
                key: 'itd_id',
                type: 'number',
                show: false,
            },
            {
                title: 'Nome',
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
            {
                title: 'Ações',
                key: 'action',
                type: 'custom',
                show: true,
            }
        ];
    }
}