import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { Service } from 'axios-middleware';
import type { BaseApiConfig } from '../services/BaseAPI';
import HttpErrorMiddleware from './middleware/HttpErrorMiddleare';

export default class HttpRequests {
    public static axiosRegister(config: BaseApiConfig): AxiosInstance {
        const axiosInstance = axios.create({
            baseURL: config.baseURL,
            headers: config.headers,
        });

        const service = new Service(axiosInstance);

        service.register([
            new HttpErrorMiddleware(),
        ])

        return axiosInstance;
    }
}