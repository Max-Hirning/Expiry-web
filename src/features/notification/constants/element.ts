import { NotificationTypes } from 'shared/types';

export const NOTIFICATION_LABELS: Record<NotificationTypes, string> = {
  [NotificationTypes.INVITE_USER_IN_TEAM]: 'invited you to a team',
  [NotificationTypes.DELETE_USER_FROM_TEAM]: 'removed you from a team',
  [NotificationTypes.DELETE_DOCUMENT]: 'deleted a document',
  [NotificationTypes.DELETE_TEAM]: 'deleted the team',
};
