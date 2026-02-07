import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { updateTeam } from '../api';
import { IUpdateTeam } from '../types';

export const useUpdateTeam = () => {
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
    mutationFn: ({
      teamId,
      ...payload
    }: IUpdateTeam & {
      teamId: string;
    }) => updateTeam(teamId, payload),
  });
};
