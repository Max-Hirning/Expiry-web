'use client';

import { FC } from 'react';

import { format } from 'date-fns';
import { IChatMember, IChatMessage } from 'entities/chat';
import { CheckCheck } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui';

interface ChatMessageProps {
  message: IChatMessage;
  author: IChatMember | undefined;
  isOwn: boolean;
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
}) => {
  const timestamp = format(new Date(message.createdAt), 'h:mma');

  if (isOwn) {
    const hasSeen = (message as any).seenBy?.length > 0;

    return (
      <div className="flex justify-end gap-3">
        <div className="flex flex-col items-end gap-1">
          <div className="max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
            <p className="text-sm">{message.message}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400">{timestamp}</span>
            <CheckCheck
              size={14}
              className={hasSeen ? 'text-blue-500' : 'text-gray-600'}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
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
      </div>
    </div>
  );
};
