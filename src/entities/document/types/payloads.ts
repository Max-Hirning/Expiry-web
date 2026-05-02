import { IFile } from '../../file';
import { IDocument } from './responses';

export interface ICreateDocument extends Required<Pick<IDocument, 'name'>> {
  files: Pick<IFile, 'mimeType' | 'width' | 'height' | 'fileSize' | 'id'>[];
  tags: string[];
}
export interface IUpdateDocument extends Partial<ICreateDocument> {
  tagsToDelete: string[];
}
