import {
  IPaginationResponse,
  MfaTypes,
  TeamMemberRoles,
  UserRoles,
  UserStatuses,
} from 'shared/types';

export interface IAvatar {
  id: string;
  createdAt: string;
  updatedAt: string;
  fileSize: number;
  mimeType: string;
  url: string;
  width: number;
  height: number;
}

export interface INotificationPreference {
  id: string;
  createdAt: string;
  updatedAt: string;
  teamNews: boolean;
  documentNews: boolean;
  inAppNotifications: boolean;
  emailNotifications: boolean;
}

export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastSeenAt: string | null;
  isOnline: boolean;
  position: TeamMemberRoles | null;
  lastLoginAt: string | null;
  invitedAt: string | null;
  fullName: string;
  email: string;
  phoneNumber: string;
  mfaType: MfaTypes | null;
  role: UserRoles;
  status: UserStatuses;
  avatar: IAvatar | null;
  notificationPreferences: INotificationPreference;
  unReadNotifications: number;
}

export interface IUserResponse {
  message: string;
  data: {
    user: IUser;
  };
}

export interface IUpdateUserResponse {
  message: string;
  data: {
    user: IUser;
    uploadUrl: string | null;
  };
}

export interface IUsersResponse {
  message: string;
  data: {
    pagination: IPaginationResponse;
    users: Omit<IUser, 'unReadNotifications'>[];
  };
}
