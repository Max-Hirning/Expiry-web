import { create } from 'zustand';

export type NotificationActiveTab =
  | 'all'
  | 'actionRequired'
  | 'informative'
  | 'starred';

interface INotificationStore {
  search: string;
  activeTab: NotificationActiveTab;
  showUnreadsOnly: boolean;
  starredNotificationIds: Set<string>;
  readNotificationIds: Set<string>;
  setSearch: (search: string) => void;
  setActiveTab: (tab: NotificationActiveTab) => void;
  toggleUnreadsOnly: () => void;
  toggleStarredNotificationId: (id: string) => void;
  toggleReadNotificationId: (id: string) => void;
  resetStarredNotificationIds: () => void;
  resetReadNotificationIds: () => void;
}

export const useNotificationStore = create<INotificationStore>(set => ({
  search: '',
  activeTab: 'all',
  showUnreadsOnly: false,
  starredNotificationIds: new Set(),
  readNotificationIds: new Set(),
  setSearch: search => set({ search }),
  setActiveTab: activeTab => set({ activeTab }),
  toggleUnreadsOnly: () =>
    set(state => ({ showUnreadsOnly: !state.showUnreadsOnly })),
  toggleStarredNotificationId: id =>
    set(state => {
      const next = new Set(state.starredNotificationIds);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return { starredNotificationIds: next };
    }),
  toggleReadNotificationId: id =>
    set(state => {
      const next = new Set(state.readNotificationIds);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return { readNotificationIds: next };
    }),
  resetStarredNotificationIds: () => set({ starredNotificationIds: new Set() }),
  resetReadNotificationIds: () => set({ readNotificationIds: new Set() }),
}));
