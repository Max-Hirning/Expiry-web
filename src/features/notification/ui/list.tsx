'use client';

import { useCallback, useEffect, useMemo } from 'react';

import {
  useGetNotificationsInfiniteScroll,
  useMarkNotificationRead,
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
    selectedIds,
    toggleSelectedId,
    resetSelectedIds,
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

  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: toggleStarred } = useToggleStarred();

  const debouncedBulkStar = useMemo(
    () =>
      debounce((ids: string[]) => {
        if (ids.length > 0) {
          toggleStarred({ notificationIds: ids });
          resetSelectedIds();
        }
      }, 600),
    [toggleStarred, resetSelectedIds],
  );

  useEffect(() => {
    const ids = Array.from(selectedIds);

    if (ids.length > 0) {
      debouncedBulkStar(ids);
    }

    return () => debouncedBulkStar.cancel();
  }, [selectedIds, debouncedBulkStar]);

  const toggleSelect = useCallback(
    (id: string) => toggleSelectedId(id),
    [toggleSelectedId],
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
          isSelected={selectedIds.has(n.id)}
          onToggleSelect={() => toggleSelect(n.id)}
          onToggleRead={() => markRead({ notificationId: n.id })}
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
