import { api } from 'shared/lib';

import { ICreateTeam, ITeamResponse } from '../types';

export const createTeam = async (
  payload: ICreateTeam,
): Promise<ITeamResponse> => {
  const response = await api.post('/teams', payload);

  return response.data;
};
