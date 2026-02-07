import { api } from 'shared/lib';

import { ITeamResponse } from '../types';

export const deleteTeam = async (teamId: string): Promise<ITeamResponse> => {
  const response = await api.delete(`/teams/${teamId}`);

  return response.data;
};
