import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';

import { getUser, getUserInvitation, getUsers } from '../api';
import { IGetUserInvitation, IGetUsersParams } from '../types';

export const useGetUsers = (query: IGetUsersParams) => {
  return useQuery({
    queryKey: [QueryKeys.GET_USERS, query],
    queryFn: ({ signal }) => getUsers(query, signal),
  });
};

export const useGetUsersInfiniteScroll = (query: IGetUsersParams) => {
  return useInfiniteQuery({
    initialPageParam: undefined as string | undefined,
    queryKey: [QueryKeys.GET_INFINITE_USERS, query],
    queryFn: ({ pageParam }) => getUsers({ ...query, cursor: pageParam }),
    getNextPageParam: lastPage =>
      lastPage.data.pagination.nextCursor ?? undefined,
  });
};

export const useGetUser = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryKey: [QueryKeys.GET_USERS, userId],
    queryFn: ({ signal }) => getUser(userId, signal),
  });
};

export const useGetUserInvitation = (params: IGetUserInvitation) => {
  return useQuery({
    queryKey: [QueryKeys.GET_USERS, params],
    queryFn: ({ signal }) => getUserInvitation(params, signal),
  });
};
