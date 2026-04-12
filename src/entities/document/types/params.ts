import {
  DocumentStatuses,
  ICursorPaginationParams,
  RiskLevels,
} from 'shared/types';

export interface IGetDocumentsParams extends ICursorPaginationParams {
  search?: string;
  teamId: string;
  authorsIds?: string[];
  statuses?: DocumentStatuses[];
  expiresAtDateRange?: [string, string];
  riskLevel?: RiskLevels[];
  sortOrder?: 'asc' | 'desc';
  sortField?: 'name' | 'createdAt';
  tagsIds?: string[];
}

export interface IGetDocumentParams {
  teamId: string;
  documentId: string;
}
