import { NotificationsList, NotificationsListFilters } from 'features';

export default function NotificationsPage() {
  return (
    <>
      <header className="sticky top-0 flex !h-fit flex-col gap-3 p-4 header-position">
        <NotificationsListFilters />
      </header>

      <main className="flex !h-[calc(100%-124px)] flex-col overflow-auto p-4 pt-0 main-position">
        <NotificationsList />
      </main>
    </>
  );
}
