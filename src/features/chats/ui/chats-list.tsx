'use client';

import { useGetChatsInfiniteScroll } from 'entities/chat';
import { LoaderCircle, MessageSquare } from 'lucide-react';

interface ChatsListProps {
  teamId: string;
  onChatSelect: (chat: { id: string; name: string }) => void;
}

export const ChatsList = ({ teamId, onChatSelect }: ChatsListProps) => {
  const { data, isLoading } = useGetChatsInfiniteScroll({ teamId, limit: 10 });
  const chats = data?.pages.flatMap(p => p.data.chats) ?? [];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoaderCircle className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (!chats.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-gray-400">
        <MessageSquare size={32} className="text-gray-300" />
        No chats yet
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {chats.map(chat => (
        <div
          key={chat.id}
          className="flex cursor-pointer items-center gap-3 border-b px-4 py-3 hover:bg-gray-50"
          onClick={() => onChatSelect(chat)}
        >
          <MessageSquare size={16} className="shrink-0 text-gray-400" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-medium">{chat.name}</span>
              {chat.unreadCount > 0 && (
                <span className="shrink-0 rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                  {chat.unreadCount}
                </span>
              )}
            </div>
            {chat.lastMessage && (
              <p className="truncate text-xs text-gray-400">
                {chat.lastMessage.message}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
