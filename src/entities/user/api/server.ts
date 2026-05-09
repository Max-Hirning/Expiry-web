import 'server-only';

import { cookies } from 'next/headers';

import { UserRoles } from 'shared/types';

import { getUser } from './get';

interface IUserSessionCookie {
  id: string;
  role: UserRoles;
  selectedTeamId: string | null;
}

export const getUserSessionInfo = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const userCookie = cookieStore.get('user')?.value;

  if (!userCookie) {
    throw new Error('Unauthorized');
  }

  const userSession = JSON.parse(userCookie) as IUserSessionCookie;

  if (!userSession.id || !userSession.role) {
    throw new Error('Unauthorized');
  }

  return getUser(userSession.id, undefined, {
    Cookie: cookieHeader,
  });
};
