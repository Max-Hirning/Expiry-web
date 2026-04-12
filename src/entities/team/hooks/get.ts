import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';

import { getTeam, getTeams } from '../api';
import { IGetTeamsParams } from '../types';

export const useGetTeams = (query: IGetTeamsParams) => {
  return useQuery({
    queryKey: [QueryKeys.GET_TEAMS, query],
    queryFn: ({ signal }) => getTeams(query, signal),
  });
};

export const useGetTeamsInfiniteScroll = (query: IGetTeamsParams) => {
  return useInfiniteQuery({
    initialPageParam: undefined as string | undefined,
    queryKey: [QueryKeys.GET_INFINITE_TEAMS, query],
    queryFn: ({ pageParam }) => getTeams({ ...query, cursor: pageParam }),
    getNextPageParam: lastPage =>
      lastPage.data.pagination.nextCursor ?? undefined,
  });
};

export const useGetTeam = (teamId: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_TEAMS, teamId],
    queryFn: ({ signal }) => getTeam(teamId, signal),
  });
};
