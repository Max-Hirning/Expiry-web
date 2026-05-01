'use client';

import { FC } from 'react';

import { INotification } from 'entities/notification';
import { BadgeInfo, Mail, MailOpen, Star, UserRound } from 'lucide-react';

import { cn } from 'shared/lib';
import { Button } from 'shared/ui';

import { NOTIFICATION_LABELS, SYSTEM_TYPES } from '../constants';

interface IProps {
  notification: INotification;
  isSelected: boolean;
  className?: string;
  onToggleSelect: () => void;
  onToggleRead: () => void;
}

export const NotificationElement: FC<IProps> = ({
  notification,
  isSelected,
  className,
  onToggleSelect,
  onToggleRead,
}) => {
  const isUnread = notification.readAt === null;
  const isSystem = SYSTEM_TYPES.has(notification.type);

  const label = NOTIFICATION_LABELS[notification.type] ?? notification.type;
  const resourceName = notification.documentName ?? notification.teamName;

  const timestamp = new Date(notification.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={cn(
        'group flex items-center gap-6 px-4 py-2 transition-colors hover:bg-stone-100',
        isUnread ? 'bg-stone-50' : 'bg-white',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-stone-100',
        )}
      >
        {isSystem ? (
          <BadgeInfo size={16} className="text-zinc-500" />
        ) : (
          <UserRound size={16} className="text-zinc-500" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          {isUnread && (
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#4c4ea1]" />
          )}
          <span
            className={cn(
              'truncate text-sm',
              isUnread
                ? 'font-semibold text-zinc-900'
                : 'font-medium text-zinc-500',
            )}
          >
            {label}
            {resourceName && (
              <>
                {' '}
                <span
                  className={cn(isUnread ? 'text-zinc-900' : 'text-zinc-400')}
                >
                  {resourceName}
                </span>
              </>
            )}
          </span>
        </div>
        <span
          className={cn(
            'text-xs font-semibold',
            isUnread ? 'text-zinc-900' : 'text-zinc-500',
          )}
        >
          {timestamp}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onToggleRead}
          title={isUnread ? 'Mark as read' : 'Mark as unread'}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white opacity-0 transition-opacity hover:bg-stone-50 group-hover:opacity-100"
        >
          {isUnread ? (
            <MailOpen size={16} className="text-zinc-500" />
          ) : (
            <Mail size={16} className="text-zinc-500" />
          )}
        </button>

        <button
          type="button"
          aria-label={notification.isStarred || isSelected ? 'Unstar' : 'Star'}
          onClick={onToggleSelect}
          title={notification.isStarred || isSelected ? 'Unstar' : 'Star'}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white transition-opacity hover:bg-stone-50',
            notification.isStarred || isSelected
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100',
          )}
        >
          <Star
            size={16}
            className={cn(
              notification.isStarred || isSelected
                ? 'fill-amber-400 text-amber-400'
                : 'text-zinc-400',
            )}
          />
        </button>
      </div>
    </div>
  );
};
