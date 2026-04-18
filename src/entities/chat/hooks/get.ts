import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';

import { getChat, getChats, getMessages } from '../api';
import { IGetChatParams, IGetChatsParams, IGetMessagesParams } from '../types';

export const useGetChats = (query: IGetChatsParams) => {
  return useQuery({
    enabled: !!query.teamId,
    queryKey: [QueryKeys.GET_CHATS, query],
    queryFn: ({ signal }) => getChats(query, signal),
  });
};

export const useGetChatsInfiniteScroll = (query: IGetChatsParams) => {
  return useInfiniteQuery({
    initialPageParam: undefined as string | undefined,
    enabled: !!query.teamId,
    queryKey: [QueryKeys.GET_INFINITE_CHATS, query],
    queryFn: ({ pageParam }) => getChats({ ...query, cursor: pageParam }),
    getNextPageParam: lastPage =>
      lastPage.data.pagination.nextCursor ?? undefined,
  });
};

export const useGetChat = (params: IGetChatParams) => {
  return useQuery({
    enabled: !!(params.teamId && params.chatId),
    queryKey: [QueryKeys.GET_CHATS, params],
    queryFn: ({ signal }) => getChat(params, signal),
  });
};

export const useGetMessages = (query: IGetMessagesParams) => {
  return useQuery({
    enabled: !!(query.teamId && query.chatId),
    queryKey: [QueryKeys.GET_MESSAGES, query],
    queryFn: ({ signal }) => getMessages(query, signal),
  });
};

export const useGetMessagesInfiniteScroll = (query: IGetMessagesParams) => {
  return useInfiniteQuery({
    initialPageParam: undefined as string | undefined,
    enabled: !!(query.teamId && query.chatId),
    queryKey: [QueryKeys.GET_INFINITE_MESSAGES, query],
    queryFn: ({ pageParam }) =>
      getMessages({ ...query, cursor: pageParam, direction: 'up' }),
    getNextPageParam: lastPage =>
      lastPage.data.pagination.nextCursor ?? undefined,
    refetchOnMount: 'always',
  });
};
