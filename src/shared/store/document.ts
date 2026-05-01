import { IGetDocumentsParams } from 'entities/document';
import { create } from 'zustand';

interface IDocumentStore {
  documentsFilters: Partial<
    Pick<
      IGetDocumentsParams,
      'expiresAtDateRange' | 'riskLevel' | 'search' | 'statuses'
    >
  > | null;
  selectedDocumentIds: Set<string>;
  updateDocumentsFilters: (
    payload: Partial<
      Pick<
        IGetDocumentsParams,
        'expiresAtDateRange' | 'riskLevel' | 'search' | 'statuses'
      >
    > | null,
  ) => void;
  toggleSelectedDocumentId: (id: string) => void;
  resetSelectedDocumentIds: () => void;
}

export const useDocumentStore = create<IDocumentStore>(set => ({
  documentsFilters: null,
  selectedDocumentIds: new Set(),
  resetSelectedDocumentIds: () =>
    set(state => ({
      ...state,
      selectedDocumentIds: new Set(),
    })),

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
  updateDocumentsFilters: payload =>
    set(state => ({
      ...state,
      documentsFilters: {
        ...(state.documentsFilters || {}),
        ...payload,
      },
    })),
}));
