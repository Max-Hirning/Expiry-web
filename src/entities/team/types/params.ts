import { IPaginationParams } from 'shared/types';

import { ITeam } from './responses';

export interface IGetTeamsParams extends IPaginationParams {
  search?: string;
  sortOrder?: 'desc' | 'asc';
  sortField?: keyof Pick<ITeam, 'createdAt' | 'name'>;
}
