'use client';

import { FC, useState } from 'react';

import {
  IDocument,
  IGetDocumentsParams,
  useGetDocumentsInfiniteScroll,
} from 'entities/document';
import { FileText } from 'lucide-react';

import { useTeamStore } from 'shared/store';

import { DocumentDrawer } from './drawer';
import { DocumentsListElement } from './element';

interface IProps extends Pick<IGetDocumentsParams, 'tagsIds' | 'authorsIds'> {
  hideCheckbox?: boolean;
  actorId?: string;
}

export const DocumentsList: FC<IProps> = ({
  tagsIds,
  actorId,
  authorsIds,
  hideCheckbox,
}) => {
  const { selectedTeam, tagsAndDocumentsFilters } = useTeamStore();
  const [selectedDocument, setSelectedDocument] = useState<Omit<
    IDocument,
    'files'
  > | null>(null);

  const { data: documentsData } = useGetDocumentsInfiniteScroll({
    page: 1,
    tagsIds,
    authorsIds,
    perPage: 10,
    teamId: selectedTeam?.id || '',
    ...(tagsAndDocumentsFilters || {}),
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
        onClose={() => setSelectedDocument(null)}
      />
    </>
  );
};
