export type Role = 'admin' | 'voluntario' | 'visitante';

export interface BaseAPIResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}