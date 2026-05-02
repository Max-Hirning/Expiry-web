import { ICursorPaginationParams } from 'shared/types';

export interface IGetFilesParams extends ICursorPaginationParams {
  teamId: string;
  documentId: string;
}
