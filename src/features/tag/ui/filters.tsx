'use client';

import { Plus } from 'lucide-react';

import { useTeamStore } from 'shared/store';
import { Button, Input } from 'shared/ui';

export const TagsListFilters = () => {
  const { tagsAndDocumentsFilters, updateTagsAndDocumentsFilters } =
    useTeamStore();

  return (
    <section className="flex w-full items-center justify-end gap-4">
      <Input
        type="search"
        value={tagsAndDocumentsFilters?.search}
        onChange={event =>
          updateTagsAndDocumentsFilters({
            search: event.target.value,
          })
        }
        className="w-[373px]"
      />
      <Button className="flex items-center justify-center gap-2">
        <Plus />
        Add
      </Button>
    </section>
  );
};
