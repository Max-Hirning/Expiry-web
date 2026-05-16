import { api } from 'shared/lib';

import { IGetNotificationsParams, INotificationsResponse } from '../types';

export const getNotifications = async (
  params: IGetNotificationsParams,
  signal?: AbortSignal,
  headers?: Record<string, string>,
): Promise<INotificationsResponse> => {
  const response = await api.get('/notifications', {
    signal,
    params,
    headers,
  });

  return response.data;
};
