import { api } from 'shared/lib';

import {
  IGetNotificationParams,
  IMarkAllNotificationsRead,
  IMarkAllNotificationsReadResponse,
  INotificationsResponse,
} from '../types';

export const patchNotification = async (
  { notificationId }: IGetNotificationParams,
  signal?: AbortSignal,
): Promise<INotificationsResponse> => {
  const response = await api.patch(
    `/notifications/${notificationId}`,
    {},
    { signal },
  );

  return response.data;
};

export const patchAllNotifications = async (
  payload: IMarkAllNotificationsRead,
  signal?: AbortSignal,
): Promise<IMarkAllNotificationsReadResponse> => {
  const response = await api.patch('/notifications', payload, { signal });

  return response.data;
};
