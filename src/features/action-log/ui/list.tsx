'use client';

import { FC } from 'react';

import {
  IGetActionLogsParams,
  useGetActionLogsInfiniteScroll,
} from 'entities/action-log';
import { History, LoaderCircle } from 'lucide-react';

import { useTeamStore } from 'shared/store';
import { InfiniteScroll } from 'shared/ui';

import { ActionLogItem } from './item';

interface IProps
  extends Pick<IGetActionLogsParams, 'actorIds' | 'documentIds'> {}

export const ActionLogsList: FC<IProps> = ({ actorIds, documentIds }) => {
  const { selectedTeam } = useTeamStore();

  const {
    data: actionLogsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetActionLogsInfiniteScroll({
    page: 1,
    teamId: selectedTeam?.id || '',
    perPage: 10,
    actorIds,
    documentIds,
  });
  const actionLogs =
    actionLogsData?.pages.map(({ data }) => data.actionLogs).flat(1) || [];

  if (actionLogs.length === 0) {
    return (
      <article className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-gray-400">
        <History size={32} className="text-gray-300" />
        No activity yet
      </article>
    );
  }

  return (
    <>
      {actionLogs.map((actionLog, index) => (
        <ActionLogItem
          key={actionLog.id}
          actionLog={actionLog}
          isFirst={index === 0}
          isLast={index === actionLogs.length - 1 && !hasNextPage}
        />
      ))}
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage}
        isLoading={isFetchingNextPage}
      >
        {hasNextPage && <LoaderCircle size={24} className="animate-spin" />}
      </InfiniteScroll>
    </>
  );
};
