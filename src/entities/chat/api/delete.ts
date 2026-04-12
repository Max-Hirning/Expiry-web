import { api } from 'shared/lib';

import { IDeleteMessageResponse } from '../types';

export const deleteMessage = async (
  {
    teamId,
    chatId,
    messageId,
  }: { teamId: string; chatId: string; messageId: string },
  signal?: AbortSignal,
): Promise<IDeleteMessageResponse> => {
  const response = await api.delete(
    `/chats/${teamId}/${chatId}/messages/${messageId}`,
    { signal },
  );

  return response.data;
};
