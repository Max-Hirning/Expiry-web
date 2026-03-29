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
    initialPageParam: 1,
    enabled: !!query.teamId,
    queryKey: [QueryKeys.GET_INFINITE_ACTION_LOGS, query],
    queryFn: ({ pageParam }) => getActionLogs({ ...query, page: pageParam }),
    getNextPageParam: lastPage => lastPage.data.pagination.nextPage,
  });
};
