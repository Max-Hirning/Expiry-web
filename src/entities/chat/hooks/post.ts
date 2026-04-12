import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { markMessagesRead, sendMessage } from '../api';
import { IMarkMessagesRead, ISendMessage } from '../types';

export const useSendMessage = () => {
  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_MESSAGES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_MESSAGES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_CHATS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_CHATS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (payload: ISendMessage & { teamId: string; chatId: string }) =>
      sendMessage(payload),
  });
};

export const useMarkMessagesRead = () => {
  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_MESSAGES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_MESSAGES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_CHATS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_CHATS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (
      payload: IMarkMessagesRead & { teamId: string; chatId: string },
    ) => markMessagesRead(payload),
  });
};
