import { ICursorPaginationParams } from 'shared/types';

export interface IGetNotificationsParams extends ICursorPaginationParams {}

export interface IGetNotificationParams {
  notificationId: string;
}
