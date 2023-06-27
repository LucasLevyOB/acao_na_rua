import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { BaseApiConfig } from '../services/BaseAPI';

export default class HttpRequests {
    public static axiosRegister(config: BaseApiConfig): AxiosInstance {
        const axiosInstance = axios.create({
            baseURL: config.baseURL,
            headers: config.headers,
        });

        return axiosInstance;
    }
}