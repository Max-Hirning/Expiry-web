import { IUser } from 'entities/user';

import { UserRoles } from 'shared/types';

export interface ISignUpResponse {
  message: string;
  data: {
    user: IUser;
    uploadUrl: string | null;
  };
}

export interface IUserSession {
  id: string;
  role: UserRoles;
  selectedTeamId: string | null;
}
