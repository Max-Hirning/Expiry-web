import { api } from 'shared/lib';

import { IUserResponse } from '../types';

export const deleteUser = async (userId: string): Promise<IUserResponse> => {
  const response = await api.delete(`/users/${userId}`);

  return response.data;
};

export const deleteUserInvitation = async (
  userId: string,
): Promise<IUserResponse> => {
  const response = await api.delete(`/users/${userId}/invite`);

  return response.data;
};
