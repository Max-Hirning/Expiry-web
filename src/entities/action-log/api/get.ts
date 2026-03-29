import { api } from 'shared/lib';

import { IActionLogsResponse, IGetActionLogsParams } from '../types';

export const getActionLogs = async (
  { teamId, ...params }: IGetActionLogsParams,
  signal?: AbortSignal,
): Promise<IActionLogsResponse> => {
  const response = await api.get(`/action-logs/${teamId}`, {
    signal,
    params,
  });

  return response.data;
};
