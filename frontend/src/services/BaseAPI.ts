import type { AxiosInstance } from 'axios';
import HttpRequests from '../http/HttpRequests';

import { useAuthStore } from '../modules/auth/stores/authStore'

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
    }

    protected abstract config(): BaseApiUrl;

}