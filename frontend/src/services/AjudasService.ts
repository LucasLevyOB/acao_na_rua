import Doacao from "../models/Doacao";
import { BaseAPIResponse, TableHeader } from "../types";
import BaseAPI from "./BaseAPI";
import Ajuda from '../models/Ajuda';

export interface CreateAjudaPayload {
  ong_id: number,
  pes_id: number,
  itd_id: number,
  ajd_qtde_item: number,
  ajd_data: string
}

export interface EditDoacaoPayload {
    doa_nome: string;
    doa_cpfcnpj: string;
    doa_data: string;
}

export default class AjudasService extends BaseAPI {
    protected config() {
        return {
            baseURL: 'http://localhost:3001',
        };
    }

    public async getAjudas(): Promise<BaseAPIResponse<Ajuda[]>> {
        try {
            const response = await this.request.get(`/ajudas/${this.emailCpf}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar Doações",
            }
        }
    }

    public async createAjuda(payload: CreateAjudaPayload): Promise<BaseAPIResponse<{ id_doacao: number }>> {
        try {
            const response = await this.request.post(`/ajudas/${this.emailCpf}`, payload);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar Doação",
            };
        }
    }

    public async editAjuda(ajudaId: number, payload: CreateAjudaPayload): Promise<BaseAPIResponse<{ id_doacao: number }>> {
        try {
            const response = await this.request.put(`/ajudas/${this.emailCpf}/${ajudaId}`, payload);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar Doação",
            };
        }
    }

    public async deleteAjuda(ajudaId: number): Promise<BaseAPIResponse<{}>> {
        try {
            const response = await this.request.delete(`/ajudas/${this.emailCpf}/${ajudaId}`);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: "Erro ao criar Doação",
            };
        }
    }

    public getHeaders(): TableHeader[] {

      /**
       * ajd_id
ong_id
pes_id
itd_id
ajd_qtde_item
ajd_data
       */
        return [
            {
                title: 'ID',
                key: 'ajd_id',
                type: 'number',
                show: false,
            },
            {
                title: 'Ong Nome',
                key: 'ong_nome',
                type: 'text',
                show: true,
            },
            {
                title: 'Pessoa Ajudada',
                key: 'pes_nome',
                type: 'text',
                show: true,
            },
            {
                title: 'Item da Ajuda',
                key: 'itd_nome',
                type: 'text',
                show: true,
            },
            {
                title: 'Quantidade Doada',
                key: 'ajd_qtde_item',
                type: 'text',
                show: true,
            },
            {
                title: 'Data da Ajuda',
                key: 'ajd_data',
                type: 'date',
                show: true,
            },
            {
                title: 'Ações',
                key: 'action',
                type: 'custom',
                show: true,
            },
            {
              title: 'Ong Id',
              key: 'ong_id',
              type: 'number',
              show: false,
            },
            {
                title: 'Pessoa ID',
                key: 'pes_id',
                type: 'number',
                show: false,
            },
            {
                title: 'Item ID',
                key: 'itd_id',
                type: 'number',
                show: false,
            },
        ];
    }
}
