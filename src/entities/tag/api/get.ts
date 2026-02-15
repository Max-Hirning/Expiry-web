import { api } from 'shared/lib';

import {
  IGetTagParams,
  IGetTagsParams,
  ITagResponse,
  ITagsResponse,
} from '../types';

export const getTag = async (
  { tagId, teamId }: IGetTagParams,
  signal?: AbortSignal,
): Promise<ITagResponse> => {
  const response = await api.get(`/tags/${teamId}/${tagId}`, {
    signal,
  });

  return response.data;
};

export const getTags = async (
  { teamId, ...params }: IGetTagsParams,
  signal?: AbortSignal,
): Promise<ITagsResponse> => {
  const response = await api.get(`/tags/${teamId}`, {
    signal,
    params,
  });

  return response.data;
};
