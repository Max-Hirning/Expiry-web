'use client';

import { useEffect, useState } from 'react';

import { InfiniteData, useQueryClient } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { socket } from 'shared/lib';

import {
  IChat,
  IChatMember,
  IChatMessage,
  IChatMessageReadStatus,
  IChatResponse,
  IChatsResponse,
  IMessagesResponse,
} from '../types';

interface UseChatSocketParams {
  chatId: string;
  teamId: string;
}

export const useChatSocket = ({ chatId, teamId }: UseChatSocketParams) => {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const handleUpdatedMessage = (message: IChatMessage) => {
      queryClient.setQueriesData<InfiniteData<IMessagesResponse>>(
        {
          queryKey: [QueryKeys.GET_INFINITE_MESSAGES],
          predicate: query => {
            const key = query.queryKey as [QueryKeys, { chatId?: string }];

            return key[1]?.chatId === chatId;
          },
        },
        old => {
          if (!old?.pages.length) {
            return old;
          }

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                messages: page.data.messages.map(m =>
                  m.id === message.id ? message : m,
                ),
              },
            })),
          };
        },
      );
    };

    const handleDeletedMessage = (message: IChatMessage) => {
      queryClient.setQueriesData<InfiniteData<IMessagesResponse>>(
        {
          queryKey: [QueryKeys.GET_INFINITE_MESSAGES],
          predicate: query => {
            const key = query.queryKey as [QueryKeys, { chatId?: string }];

            return key[1]?.chatId === chatId;
          },
        },
        old => {
          if (!old?.pages.length) {
            return old;
          }

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                messages: page.data.messages.filter(m => m.id !== message.id),
              },
            })),
          };
        },
      );

      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_CHATS] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_CHATS],
      });
    };

    const handleMessagesRead = (readStatuses: IChatMessageReadStatus[]) => {
      const chatData = queryClient.getQueryData<IChatResponse>([
        QueryKeys.GET_CHATS,
        { teamId, chatId },
      ]);
      const members = chatData?.data.chat.members ?? [];

      queryClient.setQueriesData<InfiniteData<IMessagesResponse>>(
        {
          queryKey: [QueryKeys.GET_INFINITE_MESSAGES],
          predicate: query => {
            const key = query.queryKey as [QueryKeys, { chatId?: string }];

            return key[1]?.chatId === chatId;
          },
        },
        old => {
          if (!old?.pages.length) {
            return old;
          }

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                messages: page.data.messages.map(message => {
                  const related = readStatuses.filter(
                    rs => rs.chatMessageId === message.id,
                  );

                  if (!related.length) {
                    return message;
                  }

                  const newStatuses = { ...message.chatMessageReadStatuses };

                  related.forEach(rs => {
                    if (!newStatuses[rs.readById]) {
                      const member = members.find(
                        m => m.userId === rs.readById,
                      );

                      newStatuses[rs.readById] = {
                        createdAt: rs.createdAt,
                        readBy: member as IChatMember,
                      };
                    }
                  });

                  return { ...message, chatMessageReadStatuses: newStatuses };
                }),
              },
            })),
          };
        },
      );
    };

    const handleNewMessage = (message: IChatMessage) => {
      queryClient.setQueriesData<InfiniteData<IMessagesResponse>>(
        {
          queryKey: [QueryKeys.GET_INFINITE_MESSAGES],
          predicate: query => {
            const key = query.queryKey as [QueryKeys, { chatId?: string }];

            return key[1]?.chatId === chatId;
          },
        },
        old => {
          if (!old?.pages.length) {
            return old;
          }
          const isDuplicate = old.pages.some(page =>
            page.data.messages.some(m => m.id === message.id),
          );

          if (isDuplicate) {
            return old;
          }

          return {
            ...old,
            pages: [
              {
                ...old.pages[0],
                data: {
                  ...old.pages[0].data,
                  messages: [message, ...old.pages[0].data.messages],
                },
              },
              ...old.pages.slice(1),
            ],
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_CHATS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_CHATS],
      });
    };

    const handleChatUpdated = (updatedChat: IChat) => {
      queryClient.setQueriesData<IChatResponse>(
        {
          queryKey: [QueryKeys.GET_CHATS],
          predicate: query => {
            const key = query.queryKey as [QueryKeys, { chatId?: string }?];

            return key[1]?.chatId === updatedChat.id;
          },
        },
        old => {
          if (!old) {
            return old;
          }

          return {
            ...old,
            data: {
              ...old.data,
              chat: { ...old.data.chat, ...updatedChat },
            },
          };
        },
      );

      queryClient.setQueriesData<InfiniteData<IChatsResponse>>(
        { queryKey: [QueryKeys.GET_INFINITE_CHATS] },
        old => {
          if (!old?.pages.length) {
            return old;
          }

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                chats: page.data.chats.map(c =>
                  c.id === updatedChat.id ? { ...c, ...updatedChat } : c,
                ),
              },
            })),
          };
        },
      );
    };

    socket.emit('chat:join', { chatId, teamId });
    socket.on('chat:message:new', handleNewMessage);
    socket.on('chat:message:updated', handleUpdatedMessage);
    socket.on('chat:message:deleted', handleDeletedMessage);
    socket.on('chat:messages:read', handleMessagesRead);
    socket.on('chat:updated', handleChatUpdated);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.emit('chat:leave', { chatId });
      socket.off('chat:message:new', handleNewMessage);
      socket.off('chat:message:updated', handleUpdatedMessage);
      socket.off('chat:message:deleted', handleDeletedMessage);
      socket.off('chat:messages:read', handleMessagesRead);
      socket.off('chat:updated', handleChatUpdated);
    };
  }, [socket, chatId, teamId, queryClient]);
};
