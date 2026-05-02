'use client';

import { FC, useState } from 'react';

import { IFile, useGetFilesInfiniteScroll } from 'entities/file';
import { AlertCircle, FileText, LoaderCircle } from 'lucide-react';

import { formatFileSize } from 'shared/lib';
import { InfiniteScroll } from 'shared/ui';

import { formatMimeType } from '../utils';
import { FilePreviewModal } from './modals';

interface IProps {
  documentId: string;
  teamId: string;
}

export const FilesList: FC<IProps> = ({ documentId, teamId }) => {
  const [previewFile, setPreviewFile] = useState<IFile | null>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFilesInfiniteScroll({ documentId, teamId, limit: 10 });

  const files = data?.pages.flatMap(page => page.data.files) ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle size={24} className="animate-spin text-zinc-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-gray-400">
        <AlertCircle size={32} className="text-red-300" />
        Failed to load files
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
              <p className="truncate text-sm font-medium">
                {formatMimeType(file.mimeType)}
              </p>
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
