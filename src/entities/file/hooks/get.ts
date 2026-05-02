import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';

import { getFiles } from '../api';
import { IGetFilesParams } from '../types';

export const useGetFilesInfiniteScroll = (
  query: Omit<IGetFilesParams, 'cursor'>,
) => {
  return useInfiniteQuery({
    initialPageParam: undefined as string | undefined,
    enabled: !!(query.teamId && query.documentId),
    queryKey: [QueryKeys.GET_INFINITE_FILES, query],
    queryFn: ({ pageParam }) => getFiles({ ...query, cursor: pageParam }),
    getNextPageParam: lastPage =>
      lastPage.data.pagination.nextCursor ?? undefined,
  });
};
