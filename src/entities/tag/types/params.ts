import { IGetDocumentsParams } from 'entities/document';

import { IPaginationParams } from 'shared/types';

import { ITag } from './responses';

export interface IGetTagsParams
  extends Pick<
      IGetDocumentsParams,
      'expiresAtDateRange' | 'statuses' | 'riskLevel'
    >,
    IPaginationParams {
  search?: string;
  teamId: string;
  sortOrder?: 'asc' | 'desc';
  sortField?: keyof Pick<ITag, 'tag' | 'createdAt'> | 'documentsCounts';
}

export interface IGetTagParams {
  tagId: string;
  teamId: string;
}
