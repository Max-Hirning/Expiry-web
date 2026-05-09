import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
// eslint-disable-next-line no-restricted-imports
import { getUserSession } from 'entities/auth/api/server';
import { getUsers, IGetUsersParams } from 'entities/user';

import { TeamSelector, UsersTable, UsersTableFilters } from 'features';
import { QueryKeys } from 'shared/constants';
import { makeQueryClient } from 'shared/lib';

const Page = async () => {
  let selectedTeamId: string | null = null;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const queryClient = makeQueryClient();

  try {
    const userSession = await getUserSession();

    selectedTeamId = userSession.selectedTeamId;

    if (selectedTeamId) {
      const usersQuery: IGetUsersParams = {
        limit: 10,
        teamId: selectedTeamId,
      };

      await queryClient.prefetchQuery({
        queryKey: [QueryKeys.GET_USERS, usersQuery],
        queryFn: () =>
          getUsers(usersQuery, undefined, { Cookie: cookieHeader }),
      });
    }
  } catch {
    redirect('/auth/sign-in');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className="sticky top-0 flex !h-fit flex-col gap-4 p-4 header-position">
        <div className="relative h-[62px]">
          <TeamSelector selectedTeamIdSSR={selectedTeamId} />
        </div>
        <UsersTableFilters />
      </header>
      <main className="flex !h-[calc(100%-158px)] flex-col overflow-auto p-4 pt-0 main-position">
        <UsersTable />
      </main>
    </HydrationBoundary>
  );
};

export default Page;
