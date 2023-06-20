export type Role = 'admin' | 'voluntario';

export interface BaseAPIResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}