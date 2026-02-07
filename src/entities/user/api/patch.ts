import { api } from 'shared/lib';

import { IUserResponse } from '../types';

export const toggleUserStatus = async (
  userId: string,
): Promise<IUserResponse> => {
  const response = await api.patch(`/users/${userId}/status`);

  return response.data;
};
