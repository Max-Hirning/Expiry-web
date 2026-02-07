import { api } from 'shared/lib';

import { ITeamResponse, IUpdateTeam } from '../types';

export const updateTeam = async (
  teamId: string,
  payload: IUpdateTeam,
): Promise<ITeamResponse> => {
  const response = await api.put(`/teams/${teamId}`, payload);

  return response.data;
};
