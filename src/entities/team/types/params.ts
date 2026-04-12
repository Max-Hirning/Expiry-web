import { ICursorPaginationParams } from 'shared/types';

import { ITeam } from './responses';

export interface IGetTeamsParams extends ICursorPaginationParams {
  search?: string;
  sortOrder?: 'desc' | 'asc';
  sortField?: keyof Pick<ITeam, 'createdAt' | 'name'>;
}
