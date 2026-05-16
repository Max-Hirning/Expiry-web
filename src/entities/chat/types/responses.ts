import { ILastChatMessage } from 'entities/document';

import {
  ChatAiAgentVisibility,
  ChatMemberStatus,
  ICursorPaginationResponse,
} from 'shared/types';

export interface IChat {
  id: string;
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
  name: string;
  aiAgentEnabled: boolean;
  aiAgentVisibility: ChatAiAgentVisibility;
}

export interface IChatMember {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ChatMemberStatus;
  userId: string;
  userFullName: string;
  userAvatarUrl: string | null;
  chatId: string;
}

export interface IChatMessage {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastEditedAt: string | null;
  message: string;
  isFromAiAgent: boolean;
  parentMessageId: string | null;
  authorId: string | null;
  visibleToMemberId: string | null;
  chatId: string;
  chatMessageReadStatuses: Record<string, IChatMessageReadStatusEntry>;
}

export interface IChatMessageReadStatus {
  id: string;
  chatMessageId: string;
  readById: string;
  createdAt: string;
}

export interface IChatMessageReadStatusEntry {
  createdAt: string;
  readBy: IChatMember;
}

export interface IChatsResponse {
  message: string;
  data: {
    chats: Array<
      IChat & {
        lastMessage: ILastChatMessage | null;
        unreadCount: number;
        activeMemberCount: number;
      }
    >;
    pagination: ICursorPaginationResponse;
  };
}

export interface IChatResponse {
  message: string;
  data: {
    chat: IChat & {
      members: IChatMember[];
    };
  };
}

export interface IMessagesResponse {
  message: string;
  data: {
    messages: IChatMessage[];
    pagination: ICursorPaginationResponse;
  };
}

export interface ISendMessageResponse {
  message: string;
  data: {
    chatMessage: IChatMessage;
  };
}

export interface IEditMessageResponse {
  message: string;
  data: {
    chatMessage: IChatMessage;
  };
}

export interface IDeleteMessageResponse {
  message: string;
  data: {
    chatMessage: IChatMessage;
  };
}

export interface IMarkMessagesReadResponse {
  message: string;
  data: {
    readStatuses: IChatMessageReadStatus[];
  };
}

export interface IUpdateChatResponse {
  message: string;
  data: {
    chat: IChat;
  };
}
