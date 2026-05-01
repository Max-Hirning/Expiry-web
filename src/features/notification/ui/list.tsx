'use client';

import { useCallback, useEffect, useMemo } from 'react';

import {
  useGetNotificationsInfiniteScroll,
  useMarkNotificationsRead,
  useToggleStarred,
} from 'entities/notification';
import debounce from 'lodash/debounce';
import { Bell, LoaderCircle } from 'lucide-react';

import { cn } from 'shared/lib';
import {
  ACTION_REQUIRED_TYPES,
  INFORMATIVE_TYPES,
  useNotificationStore,
} from 'shared/store';
import { InfiniteScroll } from 'shared/ui';

import { NotificationElement } from './element';

export const NotificationsList = () => {
  const {
    search,
    activeTab,
    showUnreadsOnly,
    starredNotificationIds,
    readNotificationIds,
    toggleStarredNotificationId,
    toggleReadNotificationId,
    resetStarredNotificationIds,
    resetReadNotificationIds,
  } = useNotificationStore();

  let types:
    | typeof ACTION_REQUIRED_TYPES
    | typeof INFORMATIVE_TYPES
    | undefined;

  if (activeTab === 'actionRequired') {
    types = ACTION_REQUIRED_TYPES;
  } else if (activeTab === 'informative') {
    types = INFORMATIVE_TYPES;
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetNotificationsInfiniteScroll({
      limit: 10,
      search: search.trim() || undefined,
      isRead: showUnreadsOnly ? false : undefined,
      isStarred: activeTab === 'starred' ? true : undefined,
      types,
    });

  const notifications = data?.pages.flatMap(p => p.data.notifications) ?? [];

  const { mutate: toggleRead } = useMarkNotificationsRead();
  const { mutate: toggleStarred } = useToggleStarred();

  const debouncedBulkStar = useMemo(
    () =>
      debounce((ids: string[]) => {
        if (ids.length > 0) {
          toggleStarred({ notificationIds: ids });
          resetStarredNotificationIds();
        }
      }, 600),
    [toggleStarred, resetStarredNotificationIds],
  );

  const debouncedBulkRead = useMemo(
    () =>
      debounce((ids: string[]) => {
        if (ids.length > 0) {
          toggleRead({ notificationIds: ids });
          resetReadNotificationIds();
        }
      }, 600),
    [toggleRead, resetReadNotificationIds],
  );

  useEffect(() => {
    const ids = Array.from(starredNotificationIds);

    if (ids.length > 0) {
      debouncedBulkStar(ids);
    }

    return () => debouncedBulkStar.cancel();
  }, [starredNotificationIds, debouncedBulkStar]);

  useEffect(() => {
    const ids = Array.from(readNotificationIds);

    if (ids.length > 0) {
      debouncedBulkRead(ids);
    }

    return () => debouncedBulkRead.cancel();
  }, [readNotificationIds, debouncedBulkRead]);

  const toggleSelectStarred = useCallback(
    (id: string) => toggleStarredNotificationId(id),
    [toggleStarredNotificationId],
  );

  const toggleSelectRead = useCallback(
    (id: string) => toggleReadNotificationId(id),
    [toggleReadNotificationId],
  );

  if (notifications.length === 0 && !isFetchingNextPage) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-sm text-zinc-400">
        <Bell size={32} className="text-zinc-300" />
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-zinc-100 rounded-lg border border-zinc-200 bg-white">
      {notifications.map((n, index) => (
        <NotificationElement
          key={n.id}
          className={cn(
            notifications.length === index + 1 && 'rounded-b-md',
            index === 0 && 'rounded-t-md',
          )}
          notification={n}
          isStarredSelected={starredNotificationIds.has(n.id)}
          isReadSelected={readNotificationIds.has(n.id)}
          onToggleSelect={() => toggleSelectStarred(n.id)}
          onToggleRead={() => toggleSelectRead(n.id)}
        />
      ))}
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage}
        isLoading={isFetchingNextPage}
      >
        {hasNextPage && (
          <div className="flex justify-center py-4">
            <LoaderCircle size={24} className="animate-spin text-zinc-400" />
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};
