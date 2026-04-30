'use client';

import { DocumentsList } from 'features';
import { useDocumentStore } from 'shared/store';

export const DocumentsListWidget = () => {
  const { documentsFilters } = useDocumentStore();

  return <DocumentsList filters={documentsFilters || {}} />;
};
