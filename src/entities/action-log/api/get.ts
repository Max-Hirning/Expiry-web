import { api } from 'shared/lib';

import { IActionLogsResponse, IGetActionLogsParams } from '../types';

export const getActionLogs = async (
  { teamId, ...params }: IGetActionLogsParams,
  signal?: AbortSignal,
  headers?: Record<string, string>,
): Promise<IActionLogsResponse> => {
  const response = await api.get(`/action-logs/${teamId}`, {
    signal,
    params,
    headers,
  });

  return response.data;
};
