import { api } from 'shared/lib';

import { IFilesResponse, IGetFilesParams } from '../types';

export const getFiles = async (
  { teamId, documentId, ...params }: IGetFilesParams,
  signal?: AbortSignal,
): Promise<IFilesResponse> => {
  const response = await api.get(`/documents/${teamId}/${documentId}/files`, {
    signal,
    params,
  });

  return response.data;
};
