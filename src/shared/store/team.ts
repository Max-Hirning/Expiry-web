import { IGetDocumentsParams } from 'entities/document';
import { IGetTagsParams } from 'entities/tag';
import { ITeam } from 'entities/team';
import { create } from 'zustand';

interface ITeamStore {
  selectedTeam: null | ITeam;
  tagsAndDocumentsFilters: Partial<
    Pick<
      IGetDocumentsParams,
      'expiresAtDateRange' | 'riskLevel' | 'search' | 'statuses'
    > &
      Pick<
        IGetTagsParams,
        'search' | 'expiresAtDateRange' | 'riskLevel' | 'statuses'
      >
  > | null;
  selectTeam: (payload: ITeam) => void;
  updateTagsAndDocumentsFilters: (
    payload: Partial<
      Pick<
        IGetDocumentsParams,
        'expiresAtDateRange' | 'riskLevel' | 'search' | 'statuses'
      > &
        Pick<
          IGetTagsParams,
          'search' | 'expiresAtDateRange' | 'riskLevel' | 'statuses'
        >
    > | null,
  ) => void;
}

export const useTeamStore = create<ITeamStore>(set => ({
  selectedTeam: null,
  tagsAndDocumentsFilters: null,
  updateTagsAndDocumentsFilters: payload =>
    set(state => ({
      ...state,
      tagsAndDocumentsFilters: {
        ...(state.tagsAndDocumentsFilters || {}),
        ...payload,
      },
    })),
  selectTeam: payload => set(state => ({ ...state, selectedTeam: payload })),
}));
