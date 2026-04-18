'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { useSession } from 'entities/auth';
import {
  IChatMessage,
  useChatSocket,
  useEditMessage,
  useGetChat,
  useGetMessagesInfiniteScroll,
  useMarkMessagesRead,
  useSendMessage,
} from 'entities/chat';
import debounce from 'lodash/debounce';
import { LoaderCircle, Send, X } from 'lucide-react';

import { Button, Input } from 'shared/ui';

import { ChatMessage } from './chat-message';

interface ChatWindowProps {
  chatId: string;
  teamId: string;
}

export const ChatWindow: FC<ChatWindowProps> = ({ chatId, teamId }) => {
  const [messageInput, setMessageInput] = useState('');
  const [editingMessage, setEditingMessage] = useState<IChatMessage | null>(
    null,
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const prevScrollHeightRef = useRef(0);
  const prevPagesLengthRef = useRef(0);
  const isLoadingOlderRef = useRef(false);

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
  const { mutate: editMessage, isPending: isEditing } = useEditMessage();
  const { mutate: markMessagesRead } = useMarkMessagesRead();
  const debouncedFlush = useRef(
    debounce((ids: string[], tId: string, cId: string) => {
      markMessagesRead({ teamId: tId, chatId: cId, messageIds: ids });
    }, 1500),
  );

  useChatSocket({ chatId, teamId });

  const messages =
    messagesData?.pages.flatMap(page => page.data.messages).reverse() || [];

  const chat = chatData?.data.chat;
  const userId = user?.data.user.id;

  const currentMember = chat?.members.find(m => m.userId === userId);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }
    container.scrollTo({ top: container.scrollHeight, behavior });
  };

  // Scroll to bottom on new messages, but not when loading older ones
  useEffect(() => {
    if (!isLoadingOlderRef.current) {
      const isInitialLoad = prevPagesLengthRef.current === 0;

      scrollToBottom(isInitialLoad ? 'instant' : 'smooth');
    }
  }, [messages.length]);

  // Restore scroll position after older messages are prepended
  useEffect(() => {
    const pagesLength = messagesData?.pages.length ?? 0;
    const container = scrollContainerRef.current;

    if (
      pagesLength > prevPagesLengthRef.current &&
      prevPagesLengthRef.current > 0 &&
      container &&
      isLoadingOlderRef.current
    ) {
      container.scrollTop =
        container.scrollHeight - prevScrollHeightRef.current;
      isLoadingOlderRef.current = false;
    }

    prevPagesLengthRef.current = pagesLength;
  }, [messagesData?.pages.length]);

  // Observe top sentinel to trigger loading older messages
  useEffect(() => {
    const sentinel = topSentinelRef.current;
    const container = scrollContainerRef.current;

    if (!sentinel || !container) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          prevScrollHeightRef.current = container.scrollHeight;
          isLoadingOlderRef.current = true;
          fetchNextPage();
        }
      },
      { root: container, threshold: 0.1 },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const flush = debouncedFlush.current;

    return () => flush.cancel();
  }, []);

  const handleMessageSeen = (id: string) => {
    seenIdsRef.current.add(id);
    debouncedFlush.current([...seenIdsRef.current], teamId, chatId);
  };

  const handleEditStart = (message: IChatMessage) => {
    setEditingMessage(message);
    setMessageInput(message.message);
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setMessageInput('');
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentMember || isSending || isEditing) {
      return;
    }

    if (editingMessage) {
      editMessage(
        {
          teamId,
          chatId,
          messageId: editingMessage.id,
          message: messageInput,
        },
        {
          onSuccess: () => {
            setEditingMessage(null);
            setMessageInput('');
          },
        },
      );

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  const isPending = isSending || isEditing;

  return (
    <div className="flex h-full flex-col gap-0">
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 px-4 py-4">
          <div ref={topSentinelRef} className="h-1" />

          {isFetchingNextPage && (
            <div className="flex justify-center py-1">
              <LoaderCircle size={16} className="animate-spin text-gray-400" />
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
                  teamId={teamId}
                  chatId={chatId}
                  onEditStart={handleEditStart}
                  onSeen={
                    !isOwn && !message.chatMessageReadStatuses[userId ?? '']
                      ? handleMessageSeen
                      : undefined
                  }
                />
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {editingMessage && (
        <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-2">
          <div className="flex min-w-0 flex-col">
            <span className="text-xs font-medium text-blue-500">
              Editing message
            </span>
            <span className="truncate text-sm text-gray-600">
              {editingMessage.message}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
            <X size={14} />
          </Button>
        </div>
      )}

      <div className="flex w-full gap-2 border-t px-4 py-4">
        <Input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={event => setMessageInput(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isPending || !currentMember}
          containerClassName="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!messageInput.trim() || isPending || !currentMember}
          size="icon"
        >
          {isPending ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </Button>
      </div>
    </div>
  );
};
