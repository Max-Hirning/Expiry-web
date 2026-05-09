import { ReactNode } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getTeams, IGetTeamsParams } from 'entities/team';
import { getUserSessionInfo } from 'entities/user';

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
    const userSession = await getUserSessionInfo();

    selectedTeamId = userSession.data.user.selectedTeamId;

    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: [QueryKeys.GET_USERS, userSession.data.user.id],
        queryFn: () => userSession,
        initialPageParam: undefined,
      }),
      queryClient.prefetchInfiniteQuery({
        queryKey: [QueryKeys.GET_INFINITE_TEAMS, TEAMS_QUERY],
        queryFn: ({ pageParam }) =>
          getTeams({ ...TEAMS_QUERY, cursor: pageParam }, undefined, {
            Cookie: cookieHeader,
          }),
        initialPageParam: undefined,
      }),
    ]);
  } catch {
    redirect('/auth/sign-in');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SideBar selectedTeamIdSSR={selectedTeamId} />
      {children}
    </HydrationBoundary>
  );
};

export default Layout;
