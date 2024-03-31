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