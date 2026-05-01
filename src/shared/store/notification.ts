import { create } from 'zustand';

import { NotificationTypes } from 'shared/types';

export type NotificationActiveTab =
  | 'all'
  | 'actionRequired'
  | 'informative'
  | 'starred';

interface INotificationStore {
  search: string;
  activeTab: NotificationActiveTab;
  showUnreadsOnly: boolean;
  selectedIds: Set<string>;
  setSearch: (search: string) => void;
  setActiveTab: (tab: NotificationActiveTab) => void;
  toggleUnreadsOnly: () => void;
  toggleSelectedId: (id: string) => void;
  resetSelectedIds: () => void;
}

export const useNotificationStore = create<INotificationStore>(set => ({
  search: '',
  activeTab: 'all',
  showUnreadsOnly: false,
  selectedIds: new Set(),
  setSearch: search => set({ search }),
  setActiveTab: activeTab => set({ activeTab }),
  toggleUnreadsOnly: () =>
    set(state => ({ showUnreadsOnly: !state.showUnreadsOnly })),
  toggleSelectedId: id =>
    set(state => {
      const next = new Set(state.selectedIds);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return { selectedIds: next };
    }),
  resetSelectedIds: () => set({ selectedIds: new Set() }),
}));

export const ACTION_REQUIRED_TYPES: NotificationTypes[] = [
  NotificationTypes.INVITE_USER_IN_TEAM,
  NotificationTypes.DELETE_USER_FROM_TEAM,
];

export const INFORMATIVE_TYPES: NotificationTypes[] = [
  NotificationTypes.DELETE_DOCUMENT,
  NotificationTypes.DELETE_TEAM,
];
