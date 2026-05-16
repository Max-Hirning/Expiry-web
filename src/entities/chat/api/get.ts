import { api } from 'shared/lib';

import {
  IChatResponse,
  IChatsResponse,
  IGetChatParams,
  IGetChatsParams,
  IGetMessagesParams,
  IMessagesResponse,
} from '../types';

export const getChats = async (
  params: IGetChatsParams,
  signal?: AbortSignal,
  headers?: Record<string, string>,
): Promise<IChatsResponse> => {
  const response = await api.get(`/chats/${params.teamId}`, {
    signal,
    params: { cursor: params.cursor, limit: params.limit },
    headers,
  });

  return response.data;
};

export const getChat = async (
  { teamId, chatId }: IGetChatParams,
  signal?: AbortSignal,
  headers?: Record<string, string>,
): Promise<IChatResponse> => {
  const response = await api.get(`/chats/${teamId}/${chatId}`, {
    signal,
    headers,
  });

  return response.data;
};

export const getMessages = async (
  {
    teamId,
    chatId,
    cursor,
    limit,
    parentMessageId,
    direction,
  }: IGetMessagesParams,
  signal?: AbortSignal,
  headers?: Record<string, string>,
): Promise<IMessagesResponse> => {
  const response = await api.get(`/chats/${teamId}/${chatId}/messages`, {
    signal,
    params: { cursor, limit, parentMessageId, direction },
    headers,
  });

  return response.data;
};
