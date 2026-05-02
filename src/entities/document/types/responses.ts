import {
  ActionLogTypes,
  DocumentStatuses,
  ExtractedFieldSource,
  ExtractedFieldTypes,
  ICursorPaginationResponse,
  RiskLevels,
} from 'shared/types';

import { IFile } from '../../file';

export interface IDocumentExtractedField {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: ExtractedFieldTypes;
  value: string;
  confidence: number;
  source: ExtractedFieldSource;
  documentId: string;
}

export interface ILastChatMessage {
  id: string;
  message: string;
  createdAt: string;
  author: {
    id: string;
    userFullName: string;
    userAvatarUrl: string | null;
  };
}

export interface IDocumentChat {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  lastMessage: ILastChatMessage | null;
  unreadCount: number;
  activeMemberCount: number;
}

export interface IDocumentListItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: DocumentStatuses;
  name: string;
  expiresAt: string | null;
  riskLevel: RiskLevels | null;
  actions: Record<string, ActionLogTypes[]>;
  chat: IDocumentChat | null;
}

export interface IDocument extends IDocumentListItem {
  documentExtractedFields: IDocumentExtractedField[];
  files: IFile[];
  tags: string[];
}

export interface IDocumentsResponse {
  message: string;
  data: {
    pagination: ICursorPaginationResponse;
    documents: IDocumentListItem[];
  };
}

export interface IDocumentResponse {
  message: string;
  data: {
    document: IDocument;
  };
}

export interface ICreateDocumentResponse {
  message: string;
  data: {
    document: IDocument;
    filesToUpload: Array<{ id: string; url: string }>;
  };
}

export interface IUpdateDocumentResponse extends ICreateDocumentResponse {}
