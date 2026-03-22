'use client';

import { FC } from 'react';

import {
  IGetDocumentsParams,
  useGetDocumentsInfiniteScroll,
} from 'entities/document';

import { useTeamStore } from 'shared/store';

import { DocumentsListElement } from './element';

interface IProps extends Pick<IGetDocumentsParams, 'tagsIds'> {}

export const DocumentsList: FC<IProps> = ({ tagsIds }) => {
  const { selectedTeam, tagsAndDocumentsFilters } = useTeamStore();

  const { data: documentsData } = useGetDocumentsInfiniteScroll({
    page: 1,
    tagsIds,
    perPage: 10,
    teamId: selectedTeam?.id || '',
    ...(tagsAndDocumentsFilters || {}),
  });
  const documents =
    documentsData?.pages.flatMap(page => page.data.documents) ?? [];

  return (
    <>
      {documents.map((document, index) => (
        <DocumentsListElement
          isLast={index + 1 === documents.length}
          document={document}
          key={document.id}
        />
      ))}
    </>
  );
};
