import { IUser } from 'entities/user';

export interface ISignUpResponse {
  message: string;
  data: {
    user: IUser;
    uploadUrl: string | null;
  };
}
