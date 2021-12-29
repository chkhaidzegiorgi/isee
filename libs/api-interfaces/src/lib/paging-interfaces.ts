export interface Paging {
  page: number;
  take: number;
}

export interface ListResult<T> {
  records: T[];
  count: number;
}
