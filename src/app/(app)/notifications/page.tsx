import { cookies } from 'next/headers';
import { redirect, unstable_rethrow } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
// eslint-disable-next-line no-restricted-imports
import { getUserSession } from 'entities/auth/api/server';
import {
  getNotifications,
  IGetNotificationsParams,
} from 'entities/notification';

import { NotificationsList, NotificationsListFilters } from 'features';
import { QueryKeys } from 'shared/constants';
import { makeQueryClient } from 'shared/lib';

const NotificationsPage = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const queryClient = makeQueryClient();

  try {
    await getUserSession();

    const notificationsQuery: IGetNotificationsParams = {
      limit: 10,
    };

    await queryClient.prefetchInfiniteQuery({
      queryKey: [QueryKeys.GET_INFINITE_NOTIFICATIONS, notificationsQuery],
      queryFn: ({ pageParam }) =>
        getNotifications(
          { ...notificationsQuery, cursor: pageParam },
          undefined,
          { Cookie: cookieHeader },
        ),
      initialPageParam: undefined,
    });
  } catch (error) {
    unstable_rethrow(error);
    redirect('/auth/sign-in');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className="sticky top-0 flex !h-fit flex-col gap-3 p-4 header-position">
        <NotificationsListFilters />
      </header>

      <main className="flex !h-[calc(100%-124px)] flex-col overflow-auto p-4 pt-0 main-position">
        <NotificationsList />
      </main>
    </HydrationBoundary>
  );
};

export default NotificationsPage;
