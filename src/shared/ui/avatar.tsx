import { FC } from 'react';

import { IAvatar, IUser } from 'entities/user';

import { cn } from 'shared/lib';

import { UserOnlineStatusBadge } from './badge';
import { Avatar, AvatarFallback, AvatarImage } from './shadcn';

interface IProps extends Pick<IUser, 'fullName'> {
  className?: string;
  classNameFallback?: string;
  classNameOnlineBadge?: string;
  avatar: Pick<IAvatar, 'url'> | null;
  isOnline?: boolean;
}

export const UserAvatar: FC<IProps> = ({
  classNameOnlineBadge,
  className,
  avatar,
  classNameFallback,
  isOnline,
  fullName,
}) => {
  const initials = fullName
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="relative">
      <Avatar className={cn('size-12 border border-zinc-200', className)}>
        <AvatarImage src={avatar?.url} alt={fullName} />
        <AvatarFallback
          className={cn('text-sm font-medium text-zinc-600', classNameFallback)}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      {isOnline !== undefined && (
        <UserOnlineStatusBadge
          className={cn(
            'absolute bottom-0.5 right-0.5 z-50',
            classNameOnlineBadge,
          )}
          isOnline={isOnline}
        />
      )}
    </div>
  );
};
