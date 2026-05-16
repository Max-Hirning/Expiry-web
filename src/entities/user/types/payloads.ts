import { TeamMemberRoles } from 'shared/types';

import { IAvatar, INotificationPreference, IUser } from './responses';

export interface IInviteUser
  extends Required<Pick<IUser, 'fullName' | 'email' | 'phoneNumber'>> {
  teamId?: string;
}
export interface IUpdateUser
  extends Partial<
    Pick<IUser, 'fullName' | 'email' | 'phoneNumber' | 'mfaType'>
  > {
  avatar?: Pick<IAvatar, 'mimeType' | 'width' | 'height' | 'fileSize'>;
  notificationPreferences?: Partial<
    Pick<
      INotificationPreference,
      'teamNews' | 'documentNews' | 'inAppNotifications' | 'emailNotifications'
    >
  >;
  selectedTeamId?: string | null;
}
export interface IUpdateUserPassword {
  oldPassword: string;
  password: string;
}
export interface IUpdateUserPosition {
  role: TeamMemberRoles;
}
