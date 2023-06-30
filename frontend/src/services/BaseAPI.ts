import type { AxiosInstance } from 'axios';
import HttpRequests from '../http/HttpRequests';

import { useAuthStore } from '../modules/auth/stores/authStore'
import type { TableHeader } from '../types';

interface BaseApiUrl {
    baseURL: string;
}

export interface BaseApiConfig extends BaseApiUrl {
    headers: Record<string, string>;
}

export default abstract class BaseAPI {
    protected request: AxiosInstance;

    constructor() {
        this.request = HttpRequests.axiosRegister({
            baseURL: '',
            headers: {},
        });
        this.createRequest();
    }

    private createRequest() {
        const authStore = useAuthStore();
        const configs = this.config();

        const baseURL = configs.baseURL;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authStore.auth.token,
        };

        const config: BaseApiConfig = {
            baseURL,
            headers,
        };

        this.request = HttpRequests.axiosRegister(config);
        this.request.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(error);
            }
        );

    }

    protected getAuthEmail() {
        const authStore = useAuthStore();
        if (!authStore.auth?.email) {
            throw new Error("Usuário não autenticado");
        }
        return authStore.auth.email;
    }

    protected abstract config(): BaseApiUrl;

    public abstract getHeaders(): TableHeader[];

}