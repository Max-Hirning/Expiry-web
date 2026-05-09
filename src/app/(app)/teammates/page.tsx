import { redirect } from 'next/navigation';

import { getUserSession } from 'entities/auth';

import { TeamSelector, UsersTable, UsersTableFilters } from 'features';

const Page = async () => {
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
        <UsersTableFilters />
      </header>
      <main className="flex !h-[calc(100%-158px)] flex-col overflow-auto p-4 pt-0 main-position">
        <UsersTable />
      </main>
    </>
  );
};

export default Page;
