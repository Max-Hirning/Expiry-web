export interface IMarkNotificationsReadPayload {
  notificationIds?: string[];
  allRead?: boolean;
}

export interface IToggleStarredPayload {
  notificationIds: string[];
}
