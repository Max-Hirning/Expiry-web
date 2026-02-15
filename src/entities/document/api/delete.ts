import { api } from 'shared/lib';

import { IDocumentResponse, IGetDocumentParams } from '../types';

export const deleteDocument = async ({
  documentId,
  teamId,
}: IGetDocumentParams): Promise<IDocumentResponse> => {
  const response = await api.delete(`/documents/${teamId}/${documentId}`);

  return response.data;
};
