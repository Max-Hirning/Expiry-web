import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
// eslint-disable-next-line no-restricted-imports
import { getUserSession } from 'entities/auth/api/server';
import { getDocuments, IGetDocumentsParams } from 'entities/document';

import { DocumentsListFilters, TeamSelector } from 'features';
import { DocumentsListWidget } from 'widgets';
import { QueryKeys } from 'shared/constants';
import { makeQueryClient } from 'shared/lib';

const DocumentsPage = async () => {
  let selectedTeamId: string | null = null;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const queryClient = makeQueryClient();

  try {
    const userSession = await getUserSession();

    selectedTeamId = userSession.selectedTeamId;

    if (selectedTeamId) {
      const documentsQuery: IGetDocumentsParams = {
        limit: 10,
        teamId: selectedTeamId,
      };

      await queryClient.prefetchInfiniteQuery({
        queryKey: [QueryKeys.GET_INFINITE_DOCUMENTS, documentsQuery],
        queryFn: ({ pageParam }) =>
          getDocuments({ ...documentsQuery, cursor: pageParam }, undefined, {
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
        <DocumentsListFilters />
      </header>
      <main className="flex !h-[calc(100%-158px)] flex-col overflow-auto p-4 pt-0 main-position">
        <DocumentsListWidget />
      </main>
    </HydrationBoundary>
  );
};

export default DocumentsPage;
