import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';

import { getActionLogs } from '../api';
import { IGetActionLogsParams } from '../types';

export const useGetActionLogs = (query: IGetActionLogsParams) => {
  return useQuery({
    enabled: !!query.teamId,
    queryKey: [QueryKeys.GET_ACTION_LOGS, query],
    queryFn: ({ signal }) => getActionLogs(query, signal),
  });
};

export const useGetActionLogsInfiniteScroll = (query: IGetActionLogsParams) => {
  return useInfiniteQuery({
    initialPageParam: undefined as string | undefined,
    enabled: !!query.teamId,
    queryKey: [QueryKeys.GET_INFINITE_ACTION_LOGS, query],
    queryFn: ({ pageParam }) => getActionLogs({ ...query, cursor: pageParam }),
    getNextPageParam: lastPage =>
      lastPage.data.pagination.nextCursor ?? undefined,
  });
};
