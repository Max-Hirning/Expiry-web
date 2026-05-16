import { api } from 'shared/lib';

import {
  IEditMessage,
  IEditMessageResponse,
  IUpdateChat,
  IUpdateChatResponse,
} from '../types';

export const updateChat = async (
  {
    teamId,
    chatId,
    ...payload
  }: IUpdateChat & { teamId: string; chatId: string },
  signal?: AbortSignal,
): Promise<IUpdateChatResponse> => {
  const response = await api.put(`/chats/${teamId}/${chatId}`, payload, {
    signal,
  });

  return response.data;
};

export const editMessage = async (
  {
    teamId,
    chatId,
    messageId,
    ...payload
  }: IEditMessage & { teamId: string; chatId: string; messageId: string },
  signal?: AbortSignal,
): Promise<IEditMessageResponse> => {
  const response = await api.put(
    `/chats/${teamId}/${chatId}/messages/${messageId}`,
    payload,
    { signal },
  );

  return response.data;
};
