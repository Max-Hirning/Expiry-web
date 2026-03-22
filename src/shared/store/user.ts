import { IGetUsersParams } from 'entities/user';
import { create } from 'zustand';

interface IUserStore {
  selectedUsersIds: Set<string>;
  usersFilters: Partial<Pick<IGetUsersParams, 'statuses' | 'search'>> | null;
  updateUsersFilters: (
    payload: Partial<Pick<IGetUsersParams, 'statuses' | 'search'>> | null,
  ) => void;
  toggleSelectedUserId: (id: string) => void;
  resetSelectedUsersIds: () => void;
}

export const useUserStore = create<IUserStore>(set => ({
  usersFilters: null,
  selectedUsersIds: new Set(),
  resetSelectedUsersIds: () =>
    set(state => ({
      ...state,
      selectedUsersIds: new Set(),
    })),
  toggleSelectedUserId: id =>
    set(state => {
      const newSet = new Set(state.selectedUsersIds);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return { selectedUsersIds: newSet };
    }),
  updateUsersFilters: payload =>
    set(state => ({
      ...state,
      usersFilters: {
        ...(state.usersFilters || {}),
        ...payload,
      },
    })),
}));
