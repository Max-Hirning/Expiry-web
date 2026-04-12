import { ICursorPaginationResponse, NotificationTypes } from 'shared/types';

export interface INotification {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: NotificationTypes;
  readAt: string | null;
  userId: string;
  teamName: string | null;
  teamId: string | null;
  documentName: string | null;
  documentId: string | null;
}

export interface INotificationsResponse {
  message: string;
  data: {
    notifications: INotification[];
    pagination: ICursorPaginationResponse;
  };
}

export interface IMarkAllNotificationsReadResponse {
  message: string;
  data: {
    count: number;
  };
}
