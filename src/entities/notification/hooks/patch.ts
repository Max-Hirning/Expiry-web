import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { patchAllNotifications, patchNotification } from '../api';
import { IGetNotificationParams, IMarkAllNotificationsRead } from '../types';

export const useMarkNotificationRead = () => {
  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_NOTIFICATIONS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (params: IGetNotificationParams) => patchNotification(params),
  });
};

export const useMarkAllNotificationsRead = () => {
  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_NOTIFICATIONS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (payload: IMarkAllNotificationsRead) =>
      patchAllNotifications(payload),
  });
};
