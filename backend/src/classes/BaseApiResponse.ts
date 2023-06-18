export default class BaseApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;

    constructor({ success, message, data }: { success: boolean, message?: string, data?: T }) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}