import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getUserSession } from 'entities/auth';
import { getTeams, IGetTeamsParams } from 'entities/team';

import { TeamSelector, UsersTable, UsersTableFilters } from 'features';
import { QueryKeys } from 'shared/constants';
import { makeQueryClient } from 'shared/lib';

const TEAMS_QUERY: IGetTeamsParams = {
  limit: 10,
  sortField: 'createdAt',
  sortOrder: 'desc',
};

const Page = async () => {
  let selectedTeamId: string | null = null;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const queryClient = makeQueryClient();

  try {
    const userSession = await getUserSession();

    selectedTeamId = userSession.selectedTeamId;

    await queryClient.prefetchInfiniteQuery({
      queryKey: [QueryKeys.GET_INFINITE_TEAMS, TEAMS_QUERY],
      queryFn: ({ pageParam }) =>
        getTeams({ ...TEAMS_QUERY, cursor: pageParam }, undefined, {
          Cookie: cookieHeader,
        }),
      initialPageParam: undefined,
    });
  } catch {
    redirect('/auth/sign-in');
  }

  return (
    <>
      <header className="sticky top-0 flex !h-fit flex-col gap-4 p-4 header-position">
        <div className="relative h-[62px]">
          <TeamSelector selectedTeamIdSSR={selectedTeamId} />
        </div>
        <UsersTableFilters />
      </header>
      <main className="flex !h-[calc(100%-158px)] flex-col overflow-auto p-4 pt-0 main-position">
        <UsersTable />
      </main>
    </>
  );
};

export default Page;
