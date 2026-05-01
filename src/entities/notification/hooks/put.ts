import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { patchNotification, patchToggleStarred } from '../api';
import { IMarkNotificationsReadPayload, IToggleStarredPayload } from '../types';

export const useMarkNotificationsRead = () => {
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
    mutationFn: (payload: IMarkNotificationsReadPayload) =>
      patchNotification(payload),
  });
};

export const useToggleStarred = () => {
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
    mutationFn: (payload: IToggleStarredPayload) => patchToggleStarred(payload),
  });
};
