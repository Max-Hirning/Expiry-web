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
): Promise<ITeamsResponse> => {
  const response = await api.get('/teams', {
    signal,
    params,
  });

  return response.data;
};
