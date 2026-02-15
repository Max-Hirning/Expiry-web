import {
  DocumentStatuses,
  IPaginationResponse,
  RiskLevels,
} from 'shared/types';

export interface IFile {
  id: string;
  createdAt: string;
  updatedAt: string;
  fileSize: number;
  mimeType: string;
  url: string;
  width: number | null;
  height: number | null;
  documentId: string;
}

export interface IDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: DocumentStatuses;
  name: string;
  expiresAt: string | null;
  riskLevel: RiskLevels | null;
  files: IFile[];
}

export interface IDocumentResponse {
  message: string;
  data: IDocument;
}

export interface ICreateDocumentResponse extends IDocumentResponse {
  uploadUrl: string | null;
}

export interface IUpdateDocumentResponse extends ICreateDocumentResponse {}

export interface IDocumentsResponse {
  message: string;
  data: {
    pagination: IPaginationResponse;
    documents: Omit<IDocument, 'files'>[];
  };
}
