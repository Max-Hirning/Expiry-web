import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * HOUR,
        retry: false,
      },
      dehydrate: {
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) ||
          query.state?.status === 'pending',
      },
    },
  });

export const queryClient = makeQueryClient();
