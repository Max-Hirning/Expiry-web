import { FC } from 'react';

import { IUser } from 'entities/user';

import { Avatar, AvatarFallback, AvatarImage } from './shadcn';

interface IProps extends Pick<IUser, 'avatar' | 'fullName'> {}

export const UserAvatar: FC<IProps> = ({ avatar, fullName }) => {
  const initials = fullName
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Avatar className="size-12 border border-zinc-200">
      <AvatarImage src={avatar?.url} alt={fullName} />
      <AvatarFallback className="text-sm font-medium text-zinc-600">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
