import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { signIn, signUp } from '../api';
import { ISignIn, ISignUp } from '../types';

export const useSignIn = () => {
  return useMutation({
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_USERS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (payload: ISignIn) => signIn(payload),
  });
};

export const useSignUp = () => {
  return useMutation({
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_USERS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (payload: ISignUp) => signUp(payload),
  });
};
