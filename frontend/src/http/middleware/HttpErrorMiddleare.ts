import { AxiosError } from "axios";

export default class HttpErrorMiddleware {
    async onResponseError(error: AxiosError) {
        console.log('onResponseError')
        // console.log(error.response)
        // this.checkError(error);
        throw new Error(error.message);
    }

    checkError(error: AxiosError) {
        console.log(error)
        if (error.response?.status === 401) {
            console.log('401')
        } else if (error.response?.status === 404) {
            console.log('404');
        }
    }
}