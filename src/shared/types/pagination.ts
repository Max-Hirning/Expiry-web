export interface ICursorPaginationParams {
  cursor?: string;
  limit: number;
}

export interface ICursorPaginationResponse {
  nextCursor: string | null;
}
