import { api } from 'shared/lib';

import { IDocumentResponse } from '../types';

export const toggleDocument = async (
  documentId: string,
): Promise<IDocumentResponse> => {
  const response = await api.patch(`/documents/${documentId}`);

  return response.data;
};
