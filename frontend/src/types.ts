export type Role = 'admin' | 'voluntario' | 'visitante';

export interface BaseAPIResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface TableHeader {
    align?: 'start' | 'center' | 'end';
    key: string;
    sortable?: boolean;
    title: string;
    type: 'text' | 'datetime' | 'number' | 'custom';
};
