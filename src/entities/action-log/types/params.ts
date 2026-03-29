import { IPaginationParams } from 'shared/types';

export interface IGetActionLogsParams extends IPaginationParams {
  actorIds?: string[];
  documentIds?: string[];
  teamId: string;
}
