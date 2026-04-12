import { api } from 'shared/lib';

import {
  IGetChatsParams,
  IGetMessagesParams,
  IMarkMessagesRead,
  IMarkMessagesReadResponse,
  ISendMessage,
  ISendMessageResponse,
} from '../types';

export const sendMessage = async (
  {
    teamId,
    chatId,
    ...payload
  }: ISendMessage & { teamId: string; chatId: string },
  signal?: AbortSignal,
): Promise<ISendMessageResponse> => {
  const response = await api.post(
    `/chats/${teamId}/${chatId}/messages`,
    payload,
    {
      signal,
    },
  );

  return response.data;
};

export const markMessagesRead = async (
  {
    teamId,
    chatId,
    ...payload
  }: IMarkMessagesRead & { teamId: string; chatId: string },
  signal?: AbortSignal,
): Promise<IMarkMessagesReadResponse> => {
  const response = await api.post(
    `/chats/${teamId}/${chatId}/messages/read`,
    payload,
    { signal },
  );

  return response.data;
};
