import { api } from 'shared/lib';

import {
  IGetDocumentParams,
  IUpdateDocument,
  IUpdateDocumentResponse,
} from '../types';

export const updateDocument = async (
  { documentId, teamId }: IGetDocumentParams,
  payload: IUpdateDocument,
): Promise<IUpdateDocumentResponse> => {
  const response = await api.put(`/documents/${teamId}/${documentId}`, payload);

  return response.data;
};
