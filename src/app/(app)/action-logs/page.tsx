import { ActionLogsList, TeamSelector } from 'features';

const ActionLogsPage = () => {
  return (
    <>
      <header className="sticky top-0 flex !h-fit flex-col gap-4 p-4 header-position">
        <div className="relative h-[62px]">
          <TeamSelector />
        </div>
      </header>
      <main className="flex !h-[calc(100%-94px)] flex-col overflow-auto p-4 pt-0 main-position">
        <ActionLogsList />
      </main>
    </>
  );
};

export default ActionLogsPage;
