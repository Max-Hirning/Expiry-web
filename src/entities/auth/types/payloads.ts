import { IAvatar } from 'entities/user';

export interface ISignIn {
  identifier: string;
  password: string;
}
export interface ISignUp {
  user: {
    email: string;
    phoneNumber: string;
    fullName: string;
    password: string;
  };
  invitationId?: string;
  team: {
    logo?: Pick<IAvatar, 'mimeType' | 'width' | 'height' | 'fileSize'>;
    name: string;
  };
}
