import { api } from 'shared/lib';

import {
  IDocumentResponse,
  IDocumentsResponse,
  IGetDocumentParams,
  IGetDocumentsParams,
} from '../types';

export const getDocument = async (
  { documentId, teamId }: IGetDocumentParams,
  signal?: AbortSignal,
): Promise<IDocumentResponse> => {
  const response = await api.get(`/documents/${teamId}/${documentId}`, {
    signal,
  });

  return response.data;
};

export const getDocuments = async (
  { teamId, ...params }: IGetDocumentsParams,
  signal?: AbortSignal,
): Promise<IDocumentsResponse> => {
  const response = await api.get(`/documents/${teamId}`, {
    signal,
    params,
  });

  return response.data;
};
