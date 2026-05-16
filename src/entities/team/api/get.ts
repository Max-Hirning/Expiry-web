import { api } from 'shared/lib';

import { IGetTeamsParams, ITeamResponse, ITeamsResponse } from '../types';

export const getTeam = async (
  teamId: string,
  signal?: AbortSignal,
): Promise<ITeamResponse> => {
  const response = await api.get(`/teams/${teamId}`, {
    signal,
  });

  return response.data;
};

export const getTeams = async (
  params: IGetTeamsParams,
  signal?: AbortSignal,
  headers?: Record<string, string>,
): Promise<ITeamsResponse> => {
  const response = await api.get('/teams', {
    signal,
    params,
    headers,
  });

  return response.data;
};
