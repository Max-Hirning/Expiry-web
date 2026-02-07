import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { inviteUser } from '../api';
import { IInviteUser } from '../types';

export const useInviteUser = () => {
  return useMutation({
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_USERS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_USERS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (payload: IInviteUser) => inviteUser(payload),
  });
};
