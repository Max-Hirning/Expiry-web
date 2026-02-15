import { api } from 'shared/lib';

import { ICreateDocument, ICreateDocumentResponse } from '../types';

export const createDocument = async (
  teamId: string,
  payload: ICreateDocument,
): Promise<ICreateDocumentResponse> => {
  const response = await api.post(`/documents/${teamId}`, payload);

  return response.data;
};
