export interface IPaginationResponse {
  perPage: number;
  page: number;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
}

export interface IPaginationParams {
  perPage: number;
  page: number;
}
