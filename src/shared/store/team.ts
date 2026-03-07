import { IGetDocumentsParams } from 'entities/document';
import { IGetTagsParams } from 'entities/tag';
import { ITeam } from 'entities/team';
import { create } from 'zustand';

interface ITeamStore {
  selectedTeam: null | ITeam;
  selectedTagsIds: Set<string>;
  selectedDocumentIds: Set<string>;
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
  toggleSelectedTagId: (id: string) => void;
  resetSelectedTagIds: () => void;
  toggleSelectedDocumentId: (id: string) => void;
  resetSelectedDocumentIds: () => void;
}

export const useTeamStore = create<ITeamStore>(set => ({
  selectedTeam: null,
  tagsAndDocumentsFilters: null,
  selectedTagsIds: new Set(),
  selectedDocumentIds: new Set(),
  resetSelectedTagIds: () =>
    set(state => ({
      ...state,
      selectedTagsIds: new Set(),
    })),
  resetSelectedDocumentIds: () =>
    set(state => ({
      ...state,
      selectedDocumentIds: new Set(),
    })),
  toggleSelectedTagId: id =>
    set(state => {
      const newSet = new Set(state.selectedTagsIds);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return { selectedTagsIds: newSet };
    }),

  toggleSelectedDocumentId: id =>
    set(state => {
      const newSet = new Set(state.selectedDocumentIds);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return { selectedDocumentIds: newSet };
    }),
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
