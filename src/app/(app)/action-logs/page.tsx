import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getActionLogs, IGetActionLogsParams } from 'entities/action-log';
// eslint-disable-next-line no-restricted-imports
import { getUserSession } from 'entities/auth/api/server';

import { ActionLogsList, TeamSelector } from 'features';
import { QueryKeys } from 'shared/constants';
import { makeQueryClient } from 'shared/lib';

const ActionLogsPage = async () => {
  let selectedTeamId: string | null = null;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const queryClient = makeQueryClient();

  try {
    const userSession = await getUserSession();

    selectedTeamId = userSession.selectedTeamId;

    if (selectedTeamId) {
      const actionLogsQuery: IGetActionLogsParams = {
        limit: 10,
        teamId: selectedTeamId,
        actorIds: undefined,
        documentIds: undefined,
      };

      await queryClient.prefetchInfiniteQuery({
        queryKey: [QueryKeys.GET_INFINITE_ACTION_LOGS, actionLogsQuery],
        queryFn: ({ pageParam }) =>
          getActionLogs({ ...actionLogsQuery, cursor: pageParam }, undefined, {
            Cookie: cookieHeader,
          }),
        initialPageParam: undefined,
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
      </header>
      <main className="flex !h-[calc(100%-94px)] flex-col overflow-auto p-4 pt-0 main-position">
        <ActionLogsList />
      </main>
    </HydrationBoundary>
  );
};

export default ActionLogsPage;
