import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';

import { getNotifications } from '../api';
import { IGetNotificationsParams } from '../types';

export const useGetNotifications = (query: IGetNotificationsParams) => {
  return useQuery({
    queryKey: [QueryKeys.GET_NOTIFICATIONS, query],
    queryFn: ({ signal }) => getNotifications(query, signal),
  });
};

export const useGetNotificationsInfiniteScroll = (
  query: IGetNotificationsParams,
) => {
  return useInfiniteQuery({
    initialPageParam: undefined as string | undefined,
    queryKey: [QueryKeys.GET_INFINITE_NOTIFICATIONS, query],
    queryFn: ({ pageParam }) =>
      getNotifications({ ...query, cursor: pageParam }),
    getNextPageParam: lastPage =>
      lastPage.data.pagination.nextCursor ?? undefined,
  });
};
