import { api } from 'shared/lib';

import {
  IMarkNotificationsReadPayload,
  INotificationsBulkMutationResponse,
  INotificationsResponse,
  IToggleStarredPayload,
} from '../types';

export const markNotificationsRead = async (
  payload: IMarkNotificationsReadPayload,
  signal?: AbortSignal,
): Promise<INotificationsResponse> => {
  const response = await api.put('/notifications/read', payload, { signal });

  return response.data;
};

export const toggleNotificationsStarred = async (
  payload: IToggleStarredPayload,
  signal?: AbortSignal,
): Promise<INotificationsBulkMutationResponse> => {
  const response = await api.put('/notifications/starred', payload, {
    signal,
  });

  return response.data;
};
