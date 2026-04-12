import { api } from 'shared/lib';

import { IEditMessage, IEditMessageResponse } from '../types';

export const editMessage = async (
  {
    teamId,
    chatId,
    messageId,
    ...payload
  }: IEditMessage & { teamId: string; chatId: string; messageId: string },
  signal?: AbortSignal,
): Promise<IEditMessageResponse> => {
  const response = await api.patch(
    `/chats/${teamId}/${chatId}/messages/${messageId}`,
    payload,
    { signal },
  );

  return response.data;
};
