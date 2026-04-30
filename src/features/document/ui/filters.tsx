'use client';

import { Plus } from 'lucide-react';

import { useDocumentStore, useTeamStore } from 'shared/store';
import { Button, Input } from 'shared/ui';

import { CreateDocumentModal } from './modals/create';

export const DocumentsListFilters = () => {
  const { documentsFilters, updateDocumentsFilters } = useDocumentStore();
  const { selectedTeam } = useTeamStore();

  return (
    <section className="flex w-full items-center justify-end gap-4">
      <Input
        type="search"
        value={documentsFilters?.search}
        onChange={event =>
          updateDocumentsFilters({
            search: event.target.value,
          })
        }
        className="w-[373px]"
      />
      <CreateDocumentModal teamName={selectedTeam?.name || ''}>
        <Button
          disabled={!selectedTeam?.name}
          className="flex items-center justify-center gap-2"
        >
          <Plus />
          Add
        </Button>
      </CreateDocumentModal>
    </section>
  );
};
