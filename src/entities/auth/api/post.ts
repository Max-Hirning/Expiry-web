import { IUserResponse } from 'entities/user';

import { api } from 'shared/lib';

import { ISignIn, ISignUp } from '../types';
import { ISignUpResponse } from '../types/responses';

export const signIn = async (payload: ISignIn): Promise<IUserResponse> => {
  const response = await api.post('/auth/sign-in', payload);

  return response.data;
};

export const signUp = async (payload: ISignUp): Promise<ISignUpResponse> => {
  const response = await api.post('/auth/sign-up', payload);

  return response.data;
};
