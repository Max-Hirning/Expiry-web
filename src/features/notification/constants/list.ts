import { NotificationActiveTab } from 'shared/store';
import { NotificationTypes } from 'shared/types';

export const ACTION_REQUIRED_TYPES: NotificationTypes[] = [
  NotificationTypes.INVITE_USER_IN_TEAM,
  NotificationTypes.DELETE_USER_FROM_TEAM,
];

export const INFORMATIVE_TYPES: NotificationTypes[] = [
  NotificationTypes.DELETE_DOCUMENT,
  NotificationTypes.DELETE_TEAM,
];

export const SYSTEM_TYPES = new Set<NotificationTypes>([
  NotificationTypes.DELETE_DOCUMENT,
  NotificationTypes.DELETE_TEAM,
]);

export const tabs: { key: NotificationActiveTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'actionRequired', label: 'Action Required' },
  { key: 'informative', label: 'Informative' },
  { key: 'starred', label: 'Starred' },
];
