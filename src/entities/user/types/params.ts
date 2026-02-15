import { IPaginationParams, UserRoles, UserStatuses } from 'shared/types';

import { IUser } from './responses';

export interface IGetUsersParams extends IPaginationParams {
  search?: string;
  teamId?: string;
  omitUsersIds?: string[];
  sortOrder?: 'desc' | 'asc';
  sortField?: keyof Pick<
    IUser,
    'email' | 'phoneNumber' | 'fullName' | 'createdAt' | 'status'
  >;
  statuses?: UserStatuses[];
  roles?: UserRoles[];
}

export interface IGetUserInvitation {
  invitationId: string;
}
