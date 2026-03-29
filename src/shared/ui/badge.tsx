import { FC } from 'react';

import { cn } from 'shared/lib';
import { ActionLogTypes, TeamMemberRoles, UserStatuses } from 'shared/types';

const userStatusesStylesMap: Record<UserStatuses, string> = {
  [UserStatuses.ACTIVE]: 'text-green-600 bg-green-100',
  [UserStatuses.DEACTIVATED]: 'text-orange-600 bg-orange-100',
  [UserStatuses.INVITED]: 'text-blue-600 bg-blue-100',
};

export const UserStatusBadge: FC<{
  status: UserStatuses;
}> = ({ status }) => {
  return (
    <span
      className={cn(
        userStatusesStylesMap[status],
        'flex h-5 w-14 items-center justify-center rounded-full text-xs font-medium capitalize',
      )}
    >
      {status.toLowerCase().replaceAll('_', ' ')}
    </span>
  );
};

const teamMemberRolesStylesMap: Record<TeamMemberRoles, string> = {
  [TeamMemberRoles.ADMIN]: 'text-yellow-600 bg-yellow-100',
  [TeamMemberRoles.STAFF]: 'text-green-600 bg-green-100',
};

export const TeamMemberRoleBadge: FC<{
  role: TeamMemberRoles;
}> = ({ role }) => {
  return (
    <span
      className={cn(
        teamMemberRolesStylesMap[role],
        'flex h-5 w-14 items-center justify-center rounded-full text-xs font-medium capitalize',
      )}
    >
      {role.toLowerCase().replaceAll('_', ' ')}
    </span>
  );
};

const actionLogTypesStylesMap: Record<ActionLogTypes, string> = {
  [ActionLogTypes.CREATE_TEAM]: 'text-blue-600 bg-blue-100',
  [ActionLogTypes.UPDATE_TEAM]: 'text-blue-600 bg-blue-100',
  [ActionLogTypes.ADD_USER]: 'text-green-600 bg-green-100',
  [ActionLogTypes.INVITE_USER]: 'text-green-600 bg-green-100',
  [ActionLogTypes.DELETE_USER]: 'text-red-600 bg-red-100',
  [ActionLogTypes.DELETE_HIMSELF]: 'text-red-600 bg-red-100',
  [ActionLogTypes.CREATE_DOCUMENT]: 'text-violet-600 bg-violet-100',
  [ActionLogTypes.UPDATE_DOCUMENT]: 'text-violet-600 bg-violet-100',
  [ActionLogTypes.DELETE_DOCUMENT]: 'text-red-600 bg-red-100',
};

export const ActionLogTypeBadge: FC<{
  type: ActionLogTypes;
}> = ({ type }) => {
  return (
    <span
      className={cn(
        actionLogTypesStylesMap[type],
        'flex h-5 items-center justify-center rounded-full px-2 text-xs font-medium capitalize',
      )}
    >
      {type.toLowerCase().replaceAll('_', ' ')}
    </span>
  );
};

const userOnlineStatusStylesMap: Record<string, string> = {
  false: 'bg-yellow-500',
  true: 'bg-green-500',
};

export const UserOnlineStatusBadge: FC<{
  isOnline: boolean;
  className?: string;
}> = ({ isOnline, className }) => {
  return (
    <span
      className={cn(
        userOnlineStatusStylesMap[String(isOnline)],
        'size-3 rounded-full',
        className,
      )}
    />
  );
};
