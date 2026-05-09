'use server';

import { cookies } from 'next/headers';

import { IUserSession } from '../types/responses';

export const getUserSession = async (): Promise<IUserSession> => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user')?.value;

  if (!userCookie) {
    throw new Error('Unauthorized');
  }

  const userSession = JSON.parse(userCookie) as IUserSession;

  if (!userSession.id || !userSession.role) {
    throw new Error('Unauthorized');
  }

  return userSession;
};
