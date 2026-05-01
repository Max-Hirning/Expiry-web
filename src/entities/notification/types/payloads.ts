export interface IMarkAllNotificationsRead {
  allRead: boolean;
}

export interface IToggleStarredPayload {
  notificationIds: string[];
}
