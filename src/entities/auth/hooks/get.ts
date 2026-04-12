import { getCookie } from 'cookies-next/client';
import { IUser, useGetUser } from 'entities/user';

import { TeamMemberRoles } from 'shared/types';

import { Permissions } from '../constants';

export const useSession = () => {
  const session = (): Pick<IUser, 'id'> | null => {
    const data = getCookie('user');

    if (data) {
      return JSON.parse(data);
    }

    return null;
  };

  const user = useGetUser(session()?.id ?? '');

  return user;
};

export const usePermissions = ({
  permissions,
  teamId,
}: {
  permissions: Permissions[];
  teamId: string;
}): Partial<Record<Permissions, boolean>> => {
  const { data: user } = useSession();

  const allowedPermission: Partial<Record<Permissions, boolean>> = {};

  if (permissions.includes(Permissions.UPDATE_USER_TEAM_POSITION)) {
    allowedPermission[Permissions.UPDATE_USER_TEAM_POSITION] =
      user?.data?.user?.teamMembers?.[teamId] === TeamMemberRoles.OWNER;
  }

  return allowedPermission;
};
