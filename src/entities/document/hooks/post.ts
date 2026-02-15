import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { createDocument } from '../api';
import { ICreateDocument } from '../types';

export const useCreateDocument = () => {
  return useMutation({
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_DOCUMENTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_TEAMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_TEAMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_DOCUMENTS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: ({
      teamId,
      ...payload
    }: ICreateDocument & { teamId: string }) => createDocument(teamId, payload),
  });
};
