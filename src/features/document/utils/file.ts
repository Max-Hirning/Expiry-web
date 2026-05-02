import { MIME_LABELS } from '../constants';

export const formatMimeType = (mimeType: string): string => {
  return MIME_LABELS[mimeType] ?? mimeType;
};
