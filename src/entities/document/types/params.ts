import { DocumentStatuses, IPaginationParams, RiskLevels } from 'shared/types';

import { IDocument } from './responses';

export interface IGetDocumentsParams extends IPaginationParams {
  search?: string;
  teamId: string;
  statuses?: DocumentStatuses[];
  expiresAtDateRange?: [string, string];
  riskLevel?: RiskLevels[];
  sortOrder?: 'asc' | 'desc';
  sortField?: keyof Pick<IDocument, 'name' | 'createdAt'>;
  tagsIds?: string[];
}

export interface IGetDocumentParams {
  teamId: string;
  documentId: string;
}
