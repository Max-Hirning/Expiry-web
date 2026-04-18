'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { useSession } from 'entities/auth';
import {
  useChatSocket,
  useGetChat,
  useGetMessagesInfiniteScroll,
  useSendMessage,
} from 'entities/chat';
import { LoaderCircle, Send } from 'lucide-react';

import { Button, Input, ScrollArea } from 'shared/ui';

import { ChatMessage } from './chat-message';

interface ChatWindowProps {
  chatId: string;
  teamId: string;
}

export const ChatWindow: FC<ChatWindowProps> = ({ chatId, teamId }) => {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: user } = useSession();
  const { data: chatData } = useGetChat({ teamId, chatId });
  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingMessages,
  } = useGetMessagesInfiniteScroll({
    teamId: teamId || '',
    chatId: chatId || '',
    limit: 15,
  });
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  useChatSocket({ chatId, teamId });

  const messages =
    messagesData?.pages.flatMap(page => page.data.messages).reverse() || [];

  const chat = chatData?.data.chat;
  const userId = user?.data.user.id;

  const currentMember = chat?.members.find(m => m.userId === userId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentMember || isSending) {
      return;
    }

    sendMessage(
      {
        teamId,
        chatId,
        message: messageInput,
      },
      {
        onSuccess: () => {
          setMessageInput('');
        },
      },
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoadingMessages) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoaderCircle className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-0">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 px-4 py-4">
          {hasNextPage && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  'Load older messages'
                )}
              </Button>
            </div>
          )}

          {messages.length === 0 && !hasNextPage ? (
            <div className="flex h-32 items-center justify-center text-sm text-gray-400">
              No messages yet
            </div>
          ) : (
            messages.map(message => {
              const author = chat?.members.find(m => m.id === message.authorId);
              const isOwn = currentMember?.id === message.authorId;

              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  author={author}
                  isOwn={isOwn}
                />
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="flex w-full gap-2 border-t px-4 py-4">
        <Input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={event => setMessageInput(event.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSending || !currentMember}
          containerClassName="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!messageInput.trim() || isSending || !currentMember}
          size="icon"
        >
          {isSending ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </Button>
      </div>
    </div>
  );
};
