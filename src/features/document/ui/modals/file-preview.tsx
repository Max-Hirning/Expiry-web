'use client';

import { FC } from 'react';

import { IFile } from 'entities/file';
import { Download, FileText } from 'lucide-react';

import { formatFileSize } from 'shared/lib';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'shared/ui';

import { formatMimeType } from '../../utils';

interface IPreviewProps {
  url: string;
  mimeType: string;
}

const FilePreview: FC<IPreviewProps> = ({ url, mimeType }) => {
  if (mimeType === 'application/pdf') {
    return (
      <iframe
        src={url}
        className="h-[75vh] w-full rounded-lg border-0"
        title="PDF preview"
        sandbox="allow-scripts"
        referrerPolicy="no-referrer"
      />
    );
  }

  if (mimeType.startsWith('image/')) {
    return (
      <img
        src={url}
        alt="File preview"
        className="max-h-[75vh] max-w-full rounded-lg object-contain"
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 text-sm text-gray-500">
      <FileText size={40} className="text-gray-300" />
      <p>Preview not available for this file type.</p>
      <a
        href={url}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-100"
      >
        <Download size={14} />
        Download
      </a>
    </div>
  );
};

interface IProps {
  file: IFile;
  onClose: () => void;
}

export const FilePreviewModal: FC<IProps> = ({ file, onClose }) => {
  return (
    <Dialog open onOpenChange={open => !open && onClose()}>
      <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col gap-3 p-4">
        <DialogHeader>
          <DialogTitle className="truncate text-sm font-medium">
            {formatMimeType(file.mimeType)} &mdash;{' '}
            {formatFileSize(file.fileSize)}
          </DialogTitle>
        </DialogHeader>
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
          <FilePreview url={file.url} mimeType={file.mimeType} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
