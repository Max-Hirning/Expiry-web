import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';

import { getTag, getTags } from '../api';
import { IGetTagParams, IGetTagsParams } from '../types';

export const useGetTags = (query: IGetTagsParams) => {
  return useQuery({
    enabled: !!query.teamId,
    queryKey: [QueryKeys.GET_TAGS, query],
    queryFn: ({ signal }) => getTags(query, signal),
  });
};

export const useGetTagsInfiniteScroll = (query: IGetTagsParams) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QueryKeys.GET_INFINITE_TAGS, query],
    queryFn: ({ pageParam }) => getTags({ ...query, page: pageParam }),
    getNextPageParam: lastPage => lastPage.data.pagination.nextPage,
  });
};

export const useGetTag = (params: IGetTagParams) => {
  return useQuery({
    enabled: !!(params.tagId && params.teamId),
    queryKey: [QueryKeys.GET_TAGS, params],
    queryFn: ({ signal }) => getTag(params, signal),
  });
};
