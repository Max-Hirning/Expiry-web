import { api } from 'shared/lib';

import { IUpdateUser, IUpdateUserPassword, IUserResponse } from '../types';

export const updateUser = async (
  userId: string,
  payload: IUpdateUser,
): Promise<IUserResponse> => {
  const response = await api.put(`/users/${userId}`, payload);

  return response.data;
};

export const updateUserPassword = async (
  userId: string,
  payload: IUpdateUserPassword,
): Promise<IUserResponse> => {
  const response = await api.put(`/users/${userId}/password`, payload);

  return response.data;
};
