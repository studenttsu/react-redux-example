export interface IPaginatedData<T> {
    totalRecords: number;
    pageData: T[];
}