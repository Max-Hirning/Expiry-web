import { ICursorPaginationResponse } from 'shared/types';

export interface IFile {
  id: string;
  createdAt: string;
  updatedAt: string;
  fileSize: number;
  mimeType: string;
  url: string;
  width: number | null;
  height: number | null;
  documentId: string;
}

export interface IFilesResponse {
  message: string;
  data: {
    pagination: ICursorPaginationResponse;
    files: IFile[];
  };
}
