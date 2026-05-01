'use client';

import { useMarkNotificationsRead } from 'entities/notification';
import { CheckCheck, Search } from 'lucide-react';

import { cn } from 'shared/lib';
import { useNotificationStore } from 'shared/store';
import { Input } from 'shared/ui';

import { tabs } from '../constants';

export const NotificationsListFilters = () => {
  const {
    search,
    activeTab,
    showUnreadsOnly,
    setSearch,
    setActiveTab,
    toggleUnreadsOnly,
  } = useNotificationStore();

  const { mutate: markAllRead } = useMarkNotificationsRead();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900">Notifications</h1>
        <div className="relative w-[373px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <Input
            placeholder="Search notifications..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            className="h-12 rounded-full pl-9"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-xl bg-stone-200 p-1">
          {tabs.map(tab => (
            <button
              type="button"
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'rounded-lg px-3 py-1 text-xs font-medium transition-all',
                activeTab === tab.key
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-700',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => markAllRead({ allRead: true })}
            className="flex items-center gap-1.5 text-xs font-medium text-[#4c4ea1] hover:opacity-80"
          >
            <CheckCheck size={14} />
            Mark All as Read
          </button>
          <button
            type="button"
            onClick={toggleUnreadsOnly}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              showUnreadsOnly
                ? 'border-[#4c4ea1] bg-[#4c4ea1] text-white'
                : 'border-zinc-200 bg-white text-zinc-900 hover:bg-stone-50',
            )}
          >
            All Unreads
          </button>
        </div>
      </div>
    </div>
  );
};
