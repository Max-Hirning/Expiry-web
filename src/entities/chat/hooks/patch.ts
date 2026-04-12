import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { editMessage } from '../api';
import { IEditMessage } from '../types';

export const useEditMessage = () => {
  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_MESSAGES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_MESSAGES],
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
