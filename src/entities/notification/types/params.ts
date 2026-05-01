import { ICursorPaginationParams, NotificationTypes } from 'shared/types';

export interface IGetNotificationsParams extends ICursorPaginationParams {
  search?: string;
  isStarred?: boolean;
  isRead?: boolean;
  types?: NotificationTypes[];
}

export interface IGetNotificationParams {
  notificationId: string;
}
