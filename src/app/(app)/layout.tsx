import { ReactNode } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getUserSession } from 'entities/auth';
import { getTeams, IGetTeamsParams } from 'entities/team';

import { SideBar } from 'features';
import { QueryKeys } from 'shared/constants';
import { makeQueryClient } from 'shared/lib';

type Props = {
  children: ReactNode;
};

const TEAMS_QUERY: IGetTeamsParams = {
  limit: 10,
  sortField: 'createdAt',
  sortOrder: 'desc',
};

const Layout = async ({ children }: Props) => {
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SideBar selectedTeamId={selectedTeamId} />
      {children}
    </HydrationBoundary>
  );
};

export default Layout;
