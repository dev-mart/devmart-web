export interface PageableRestResponse<T> {

    pageSize: number;
    currentPage: number;
    totalElements: number;
    totalPages: number;
    content: T[];

}
