import { IPaginationResponse } from 'shared/types';

export interface ITag {
  id: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface ITagResponse {
  message: string;
  data: ITag;
}

export interface ITagsResponse {
  message: string;
  data: {
    pagination: IPaginationResponse;
    tags: ITag[];
  };
}
