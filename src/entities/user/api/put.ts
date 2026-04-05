import { api } from 'shared/lib';

import {
  IUpdateUser,
  IUpdateUserPassword,
  IUpdateUserPosition,
  IUpdateUserPositionParams,
  IUserPositionResponse,
  IUserResponse,
} from '../types';

export const updateUser = async (
  userId: string,
  payload: IUpdateUser,
): Promise<IUserResponse> => {
  const response = await api.put(`/users/${userId}`, payload);

  return response.data;
};

export const updateUserPosition = async (
  { userId, teamId }: IUpdateUserPositionParams,
  payload: IUpdateUserPosition,
): Promise<IUserPositionResponse> => {
  const response = await api.put(
    `/users/${userId}/teams/${teamId}/role`,
    payload,
  );

  return response.data;
};

export const updateUserPassword = async (
  userId: string,
  payload: IUpdateUserPassword,
): Promise<IUserResponse> => {
  const response = await api.put(`/users/${userId}/password`, payload);

  return response.data;
};
