import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { createTeam } from '../api';
import { ICreateTeam } from '../types';

export const useCreateTeam = () => {
  return useMutation({
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_TEAMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_TEAMS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (payload: ICreateTeam) => createTeam(payload),
  });
};
