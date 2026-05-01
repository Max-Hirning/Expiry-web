import { api } from 'shared/lib';

import {
  IMarkAllNotificationsReadResponse,
  IMarkNotificationsReadPayload,
  INotificationsResponse,
  IToggleStarredPayload,
} from '../types';

export const patchNotification = async (
  payload: IMarkNotificationsReadPayload,
  signal?: AbortSignal,
): Promise<INotificationsResponse> => {
  const response = await api.put('/notifications/read', payload, { signal });

  return response.data;
};

export const patchToggleStarred = async (
  payload: IToggleStarredPayload,
  signal?: AbortSignal,
): Promise<IMarkAllNotificationsReadResponse> => {
  const response = await api.put('/notifications/starred', payload, {
    signal,
  });

  return response.data;
};
