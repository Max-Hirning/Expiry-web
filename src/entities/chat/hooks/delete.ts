import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { deleteMessage } from '../api';

export const useDeleteMessage = () => {
  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_MESSAGES],
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
    mutationFn: (params: {
      teamId: string;
      chatId: string;
      messageId: string;
    }) => deleteMessage(params),
  });
};
