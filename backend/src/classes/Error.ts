export default class Error {
    message: string = "Erro interno do servidor.";
    success: boolean = false;
    status: number = 500;

    constructor(message?: string, status?: number) {
        if (message) this.message = message;
        if (status) this.status = status;
    }
}
