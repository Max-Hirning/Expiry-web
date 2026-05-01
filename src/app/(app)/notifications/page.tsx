'use client';

import { Star } from 'lucide-react';

import { NotificationsList, NotificationsListFilters } from 'features';
import { useNotificationStore } from 'shared/store';

const BulkActionsBar = ({ count }: { count: number }) => (
  <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-2">
    <Star size={14} className="fill-amber-400 text-amber-400" />
    <span className="text-xs font-medium text-zinc-700">
      {count} notification{count === 1 ? '' : 's'} selected — will be starred
      automatically
    </span>
  </div>
);

export default function NotificationsPage() {
  const { selectedIds } = useNotificationStore();

  return (
    <>
      <header className="sticky top-0 flex !h-fit flex-col gap-3 p-4 header-position">
        <NotificationsListFilters />
        {selectedIds.size > 0 && <BulkActionsBar count={selectedIds.size} />}
      </header>

      <main className="flex !h-[calc(100%-124px)] flex-col overflow-auto p-4 pt-0 main-position">
        <NotificationsList />
      </main>
    </>
  );
}
