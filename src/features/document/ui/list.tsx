'use client';

import { FC, useState } from 'react';

import {
  IDocumentListItem,
  IGetDocumentsParams,
  useGetDocumentsInfiniteScroll,
} from 'entities/document';
import { FileText } from 'lucide-react';

import { cn } from 'shared/lib';
import { useTeamStore } from 'shared/store';
import { Card } from 'shared/ui';

import { DocumentDrawer } from './drawer';
import { DocumentsListElement } from './element';

interface IProps {
  hideCheckbox?: boolean;
  actorId?: string;
  type?: 'child';
  filters: Omit<IGetDocumentsParams, 'teamId' | 'limit'>;
}

export const DocumentsList: FC<IProps> = ({
  filters,
  actorId,
  type,
  hideCheckbox,
}) => {
  const { selectedTeam } = useTeamStore();
  const [selectedDocument, setSelectedDocument] =
    useState<IDocumentListItem | null>(null);

  const { data: documentsData, isLoading } = useGetDocumentsInfiniteScroll({
    limit: 10,
    teamId: selectedTeam?.id || '',
    ...(filters || {}),
  });
  const documents =
    documentsData?.pages.flatMap(page => page.data.documents) ?? [];

  if (documents.length === 0) {
    return (
      <article className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-gray-400">
        <FileText size={32} className="text-gray-300" />
        No documents yet
      </article>
    );
  }

  if (type === 'child') {
    return (
      <>
        {documents.map((document, index) => (
          <DocumentsListElement
            actorId={actorId}
            hideCheckbox={hideCheckbox}
            isLast={index + 1 === documents.length}
            document={document}
            key={document.id}
            onRowClick={setSelectedDocument}
          />
        ))}
        <DocumentDrawer
          document={selectedDocument}
          open={!!selectedDocument}
          teamId={selectedTeam?.id || ''}
          onClose={() => setSelectedDocument(null)}
        />
      </>
    );
  }

  return (
    <>
      <p
        className={cn(
          'sticky top-0 z-50 bg-white pb-2 text-sm text-gray-400',
          isLoading && 'hidden',
        )}
      >
        {documents.length} search result{documents.length > 1 ? 's' : ''}
      </p>
      <Card>
        {documents.map((document, index) => (
          <DocumentsListElement
            actorId={actorId}
            hideCheckbox={hideCheckbox}
            isLast={index + 1 === documents.length}
            document={document}
            key={document.id}
            onRowClick={setSelectedDocument}
          />
        ))}
        <DocumentDrawer
          document={selectedDocument}
          open={!!selectedDocument}
          teamId={selectedTeam?.id || ''}
          onClose={() => setSelectedDocument(null)}
        />
      </Card>
    </>
  );
};
