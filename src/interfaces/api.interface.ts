export interface ApiError {
    status: number;
    message: string;
    errorCode: string;
}

export enum ApiStatus {
    unknown = 0,
    loading = 1,
    ready = 2,
    error = 3
}

export interface PageableRestResponse<T> {
    pageSize: number;
    currentPage: number;
    totalElements: number;
    totalPages: number;
    content: T[];
}
