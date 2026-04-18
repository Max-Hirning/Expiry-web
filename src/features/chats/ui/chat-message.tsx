'use client';

import { FC, useEffect, useRef } from 'react';

import { differenceInMinutes, format, parseISO } from 'date-fns';
import { IChatMember, IChatMessage, useDeleteMessage } from 'entities/chat';
import { CheckCheck } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from 'shared/ui';

interface ChatMessageProps {
  message: IChatMessage;
  author: IChatMember | undefined;
  isOwn: boolean;
  teamId: string;
  chatId: string;
  onEditStart: (message: IChatMessage) => void;
  onSeen?: (id: string) => void;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const ChatMessage: FC<ChatMessageProps> = ({
  message,
  author,
  isOwn,
  teamId,
  chatId,
  onEditStart,
  onSeen,
}) => {
  const timestamp = format(new Date(message.createdAt), 'h:mma');
  const { mutate: deleteMessage } = useDeleteMessage();
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOwn || !onSeen || !messageRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onSeen(message.id);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(messageRef.current);

    return () => observer.disconnect();
  }, [isOwn, message.id, onSeen]);

  const MESSAGE_EDIT_WINDOW_MINUTES = 5;
  const hasSeen = Object.keys(message.chatMessageReadStatuses).length > 0;
  const canModify =
    !hasSeen &&
    differenceInMinutes(new Date(), parseISO(message.updatedAt)) <
      MESSAGE_EDIT_WINDOW_MINUTES;

  if (isOwn) {
    const bubble = (
      <div className="flex justify-end gap-3">
        <div className="flex flex-col items-end gap-1">
          <div className="max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
            <p className="text-sm">{message.message}</p>
          </div>
          <div className="flex items-center gap-1">
            {message.lastEditedAt && (
              <span className="text-xs italic text-gray-400">edited</span>
            )}
            <span className="text-xs text-gray-400">{timestamp}</span>
            <CheckCheck
              size={14}
              className={hasSeen ? 'text-blue-500' : 'text-gray-600'}
            />
          </div>
        </div>
      </div>
    );

    if (!canModify) {
      return bubble;
    }

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>{bubble}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => onEditStart(message)}>
            Edit
          </ContextMenuItem>
          <ContextMenuItem
            className="text-red-500 focus:text-red-500"
            onClick={() =>
              deleteMessage({ teamId, chatId, messageId: message.id })
            }
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  }

  return (
    <div ref={messageRef} className="flex gap-3">
      <Avatar className="mt-1 size-8 shrink-0">
        <AvatarImage src={author?.userAvatarUrl || undefined} />
        <AvatarFallback className="text-xs">
          {author?.userFullName ? getInitials(author.userFullName) : '?'}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {author?.userFullName || 'Unknown'}
          </span>
          <span className="text-xs text-gray-400">{timestamp}</span>
        </div>
        <div className="max-w-xs rounded-2xl bg-gray-100 px-4 py-2">
          <p className="text-sm text-gray-900">{message.message}</p>
        </div>
        {message.lastEditedAt && (
          <span className="text-xs italic text-gray-400">edited</span>
        )}
      </div>
    </div>
  );
};
