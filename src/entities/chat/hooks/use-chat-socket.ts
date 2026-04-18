import { useEffect, useState } from 'react';

import { InfiniteData, useQueryClient } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { socket } from 'shared/lib';

import { IChatMessage, IMessagesResponse } from '../types';

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

    socket.emit('chat:join', { chatId, teamId });
    socket.on('chat:message:new', handleNewMessage);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.emit('chat:leave', { chatId });
      socket.off('chat:message:new', handleNewMessage);
    };
  }, [socket, chatId, teamId, queryClient]);
};
