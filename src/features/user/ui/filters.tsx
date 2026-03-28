'use client';

import { useGetUsers } from 'entities/user';
import { Plus } from 'lucide-react';

import { cn } from 'shared/lib';
import { useTeamStore, useUserStore } from 'shared/store';
import { Button, Input } from 'shared/ui';

export const UsersTableFilters = () => {
  const { usersFilters, updateUsersFilters } = useUserStore();
  const { selectedTeam } = useTeamStore();

  const { data: usersData, isLoading } = useGetUsers({
    page: 1,
    perPage: 10,
    teamId: selectedTeam?.id || '',
  });
  const users = usersData?.data.users || [];

  return (
    <section
      className={cn(
        'flex w-full items-center justify-end gap-4',
        (isLoading || (!isLoading && users.length === 0)) && 'hidden',
      )}
    >
      <Input
        type="search"
        value={usersFilters?.search ?? ''}
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
