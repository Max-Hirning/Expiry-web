import { ICursorPaginationResponse } from 'shared/types';

export interface ITag {
  id: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
  documents: number;
}

export interface ITagResponse {
  message: string;
  data: ITag;
}

export interface ITagsResponse {
  message: string;
  data: {
    pagination: ICursorPaginationResponse;
    tags: ITag[];
  };
}
