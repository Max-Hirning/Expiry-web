import { ActionLogTypes, ICursorPaginationResponse } from 'shared/types';

export interface IActionLog {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: ActionLogTypes;
  documentName: string | null;
  documentId: string | null;
  actorId: string;
  actorFullName: string;
  actorAvatarUrl: string | null;
  userId: string | null;
  userFullName: string | null;
  userAvatarUrl: string | null;
}

export interface IActionLogsResponse {
  message: string;
  data: {
    pagination: ICursorPaginationResponse;
    actionLogs: IActionLog[];
  };
}
