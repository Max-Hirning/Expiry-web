import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { updateUser, updateUserPassword, updateUserPosition } from '../api';
import {
  IUpdateUser,
  IUpdateUserPassword,
  IUpdateUserPosition,
  IUpdateUserPositionParams,
} from '../types';

export const useUpdateUser = () => {
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
    mutationFn: ({
      userId,
      ...payload
    }: IUpdateUser & {
      userId: string;
    }) => updateUser(userId, payload),
  });
};

export const useUpdateUserPosition = () => {
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
    mutationFn: ({
      userId,
      teamId,
      ...payload
    }: IUpdateUserPosition & IUpdateUserPositionParams) =>
      updateUserPosition(
        {
          userId,
          teamId,
        },
        payload,
      ),
  });
};

export const useUpdateUserPassword = () => {
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
    mutationFn: ({
      userId,
      ...payload
    }: IUpdateUserPassword & {
      userId: string;
    }) => updateUserPassword(userId, payload),
  });
};
