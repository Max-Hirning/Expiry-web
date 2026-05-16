import { api } from 'shared/lib';

import {
  IGetUserInvitation,
  IGetUsersParams,
  IUserResponse,
  IUsersResponse,
} from '../types';

export const getUser = async (
  userId: string,
  signal?: AbortSignal,
  headers?: Record<string, string>,
): Promise<IUserResponse> => {
  const response = await api.get(`/users/${userId}`, {
    signal,
    headers,
  });

  return response.data;
};

export const getUserInvitation = async (
  params: IGetUserInvitation,
  signal?: AbortSignal,
): Promise<IUserResponse> => {
  const response = await api.get(`/users/invite`, {
    signal,
    params,
  });

  return response.data;
};

export const getUsers = async (
  params: IGetUsersParams,
  signal?: AbortSignal,
  headers?: Record<string, string>,
): Promise<IUsersResponse> => {
  const response = await api.get('/users', {
    signal,
    params,
    headers,
  });

  return response.data;
};
