'use client';

import { FC, useState } from 'react';

import { IFile, useGetFilesInfiniteScroll } from 'entities/file';
import { FileText, LoaderCircle } from 'lucide-react';

import { formatFileSize } from 'shared/lib';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  InfiniteScroll,
} from 'shared/ui';

interface IProps {
  documentId: string;
  teamId: string;
}

const FilePreviewModal: FC<{ file: IFile; onClose: () => void }> = ({
  file,
  onClose,
}) => {
  const isPdf = file.mimeType === 'application/pdf';

  return (
    <Dialog open onOpenChange={open => !open && onClose()}>
      <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col gap-3 p-4">
        <DialogHeader>
          <DialogTitle className="truncate text-sm font-medium">
            {file.mimeType} &mdash; {formatFileSize(file.fileSize)}
          </DialogTitle>
        </DialogHeader>
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
          {isPdf ? (
            <iframe
              src={file.url}
              className="h-[75vh] w-full rounded-lg border-0"
              title="PDF preview"
            />
          ) : (
            <img
              src={file.url}
              alt="File preview"
              className="max-h-[75vh] max-w-full rounded-lg object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const FilesList: FC<IProps> = ({ documentId, teamId }) => {
  const [previewFile, setPreviewFile] = useState<IFile | null>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFilesInfiniteScroll({ documentId, teamId, limit: 10 });

  const files = data?.pages.flatMap(page => page.data.files) ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle size={24} className="animate-spin text-zinc-400" />
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-gray-400">
        <FileText size={32} className="text-gray-300" />
        No files yet
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        {files.map((file, index) => (
          <button
            key={file.id}
            type="button"
            onClick={() => setPreviewFile(file)}
            className={`flex w-full items-center gap-3 border-b px-1 py-3 text-left transition-colors hover:bg-gray-50 ${index === files.length - 1 && !hasNextPage ? 'border-none' : ''}`}
          >
            <FileText size={20} className="shrink-0 text-gray-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.mimeType}</p>
              <p className="text-xs text-gray-400">
                {formatFileSize(file.fileSize)}
              </p>
            </div>
          </button>
        ))}
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage}
          isLoading={isFetchingNextPage}
        >
          {hasNextPage && (
            <div className="flex justify-center py-4">
              <LoaderCircle size={24} className="animate-spin text-zinc-400" />
            </div>
          )}
        </InfiniteScroll>
      </div>

      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </>
  );
};
