import { ICursorPaginationParams } from 'shared/types';

export interface IGetChatsParams extends ICursorPaginationParams {
  teamId: string;
}

export interface IGetChatParams {
  teamId: string;
  chatId: string;
}

export interface IGetMessagesParams extends ICursorPaginationParams {
  teamId: string;
  chatId: string;
  parentMessageId?: string;
  direction?: 'up' | 'down';
}
