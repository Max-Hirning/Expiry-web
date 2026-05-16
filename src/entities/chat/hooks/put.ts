import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { editMessage, updateChat } from '../api';
import { IEditMessage, IUpdateChat } from '../types';

export const useEditMessage = () => {
  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_MESSAGES],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (
      payload: IEditMessage & {
        teamId: string;
        chatId: string;
        messageId: string;
      },
    ) => editMessage(payload),
  });
};

export const useUpdateChat = () => {
  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_CHATS] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_CHATS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (payload: IUpdateChat & { teamId: string; chatId: string }) =>
      updateChat(payload),
  });
};
