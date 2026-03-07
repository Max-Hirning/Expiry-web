import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';

import { getDocument, getDocuments } from '../api';
import { IGetDocumentParams, IGetDocumentsParams } from '../types';

export const useGetDocuments = (query: IGetDocumentsParams) => {
  return useQuery({
    enabled: !!query.teamId,
    queryKey: [QueryKeys.GET_DOCUMENTS, query],
    queryFn: ({ signal }) => getDocuments(query, signal),
  });
};

export const useGetDocumentsInfiniteScroll = (query: IGetDocumentsParams) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QueryKeys.GET_INFINITE_DOCUMENTS, query],
    queryFn: ({ pageParam }) => getDocuments({ ...query, page: pageParam }),
    getNextPageParam: lastPage => lastPage.data.pagination.nextPage,
  });
};

export const useGetDocument = (params: IGetDocumentParams) => {
  return useQuery({
    enabled: !!(params.teamId && params.documentId),
    queryKey: [QueryKeys.GET_DOCUMENTS, params],
    queryFn: ({ signal }) => getDocument(params, signal),
  });
};
