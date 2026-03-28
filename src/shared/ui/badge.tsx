import { FC } from 'react';

import { cn } from 'shared/lib';
import { UserStatuses } from 'shared/types';

interface IProps {
  status: UserStatuses;
}

const userStatusesStylesMap: Record<UserStatuses, string> = {
  [UserStatuses.ACTIVE]: 'text-green-600 bg-green-100',
  [UserStatuses.DEACTIVATED]: 'text-orange-600 bg-orange-100',
  [UserStatuses.INVITED]: 'text-blue-600 bg-blue-100',
};

export const UserStatusBadge: FC<IProps> = ({ status }) => {
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
