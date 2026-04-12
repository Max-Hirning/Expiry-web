import { ICursorPaginationParams } from 'shared/types';

export interface IGetActionLogsParams extends ICursorPaginationParams {
  actorIds?: string[];
  documentIds?: string[];
  teamId: string;
}
