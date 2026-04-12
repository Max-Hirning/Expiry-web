'use client';

import { useState } from 'react';

import { IUser, useGetUsers } from 'entities';
import { Plus, Users } from 'lucide-react';

import { useTeamStore, useUserStore } from 'shared/store';
import { Button, DataTable } from 'shared/ui';

import { columns } from '../constants';
import { UserDrawer } from './drawer';

export const UsersTable = () => {
  const { selectedTeam } = useTeamStore();
  const { usersFilters } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<Omit<
    IUser,
    'unReadNotifications' | 'teamMembers'
  > | null>(null);

  const { data: usersData, isLoading } = useGetUsers({
    limit: 10,
    ...(usersFilters || {}),
    teamId: selectedTeam?.id || '',
  });
  const users = usersData?.data.users || [];

  if (isLoading) {
    return null;
  }

  if (!isLoading && users.length === 0) {
    return (
      <section className="m-auto flex flex-col items-center justify-center gap-5">
        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-gray-200">
          <Users size={85} className="text-gray-600" />
        </div>
        <article className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-lg font-semibold">No users yet</h1>
          <p className="text-center text-sm">
            Created users will be
            <br />
            displayed here
          </p>
        </article>
        <Button className="flex gap-4">
          <Plus />
          Invite User
        </Button>
      </section>
    );
  }

  return (
    <>
      <DataTable columns={columns} data={users} onRowClick={setSelectedUser} />
      {selectedTeam && (
        <UserDrawer
          user={selectedUser}
          teamId={selectedTeam.id}
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};
