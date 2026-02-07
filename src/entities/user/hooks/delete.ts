import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { deleteUser, deleteUserInvitation } from '../api';

export const useDeleteUser = () => {
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
    mutationFn: (userId: string) => deleteUser(userId),
  });
};

export const useDeleteUserInvitation = () => {
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
    mutationFn: (userId: string) => deleteUserInvitation(userId),
  });
};
