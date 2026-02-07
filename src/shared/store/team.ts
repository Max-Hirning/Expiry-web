import { ITeam } from 'entities/team';
import { create } from 'zustand';

interface ITeamStore {
  selectedTeam: null | ITeam;
  selectTeam: (payload: ITeam) => void;
}

export const useTeamStore = create<ITeamStore>(set => ({
  selectedTeam: null,
  selectTeam: payload => set(state => ({ ...state, selectedTeam: payload })),
}));
