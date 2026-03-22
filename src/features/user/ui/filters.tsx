'use client';

import { Plus } from 'lucide-react';

import { useUserStore } from 'shared/store';
import { Button, Input } from 'shared/ui';

export const UsersTableFilters = () => {
  const { usersFilters, updateUsersFilters } = useUserStore();

  return (
    <section className="flex w-full items-center justify-end gap-4">
      <Input
        type="search"
        value={usersFilters?.search}
        onChange={event =>
          updateUsersFilters({
            search: event.target.value,
          })
        }
        className="w-[373px]"
      />
      <Button className="flex items-center justify-center gap-2">
        <Plus />
        Invite
      </Button>
    </section>
  );
};
