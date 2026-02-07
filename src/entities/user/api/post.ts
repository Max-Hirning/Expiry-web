import { api } from 'shared/lib';

import { IInviteUser, IUserResponse } from '../types';

export const inviteUser = async (
  payload: IInviteUser,
): Promise<IUserResponse> => {
  const response = await api.post('/users/invite', payload);

  return response.data;
};
