import { redirect } from 'next/navigation';

import { getUserSession } from 'entities/auth';

import { DocumentsListFilters, TeamSelector } from 'features';
import { DocumentsListWidget } from 'widgets';

const DocumentsPage = async () => {
  let selectedTeamId: string | null = null;

  try {
    const userSession = await getUserSession();

    selectedTeamId = userSession.selectedTeamId;
  } catch {
    redirect('/auth/sign-in');
  }

  return (
    <>
      <header className="sticky top-0 flex !h-fit flex-col gap-4 p-4 header-position">
        <div className="relative h-[62px]">
          <TeamSelector selectedTeamIdSSR={selectedTeamId} />
        </div>
        <DocumentsListFilters />
      </header>
      <main className="flex !h-[calc(100%-158px)] flex-col overflow-auto p-4 pt-0 main-position">
        <DocumentsListWidget />
      </main>
    </>
  );
};

export default DocumentsPage;
