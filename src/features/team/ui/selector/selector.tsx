'use client';

import { FC, useState } from 'react';

import Link from 'next/link';

import { useSession } from 'entities/auth';
import { useGetTeamsInfiniteScroll } from 'entities/team';
import { LoaderCircle, Maximize2, Minimize2, Plus } from 'lucide-react';

import { cn } from 'shared/lib';
import { useTeamStore } from 'shared/store';
import { Button, InfiniteScroll } from 'shared/ui';

import { TeamSelectorListElement } from './element';

type Props = {
  selectedTeamIdSSR: string | null;
};

export const TeamSelector: FC<Props> = ({ selectedTeamIdSSR }) => {
  const { selectedTeam: selectedTeamClient } = useTeamStore();
  const { data: session } = useSession();
  const {
    data: teamsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTeamsInfiniteScroll({
    limit: 10,
    sortField: 'createdAt',
    sortOrder: 'desc',
  });
  const teams = teamsData?.pages.flatMap(({ data }) => data.teams) ?? [];
  const selectedTeamId =
    selectedTeamClient?.id ??
    session?.data.user.selectedTeamId ??
    selectedTeamIdSSR ??
    undefined;
  const selectedTeam = teams.find(team => team.id === selectedTeamId);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={cn(
        'relative z-50 w-full rounded-full bg-black',
        open ? 'rounded-3xl' : 'py-1',
      )}
    >
      <article className="flex items-center pl-5">
        {open && (
          <>
            <h1 className="flex-1 text-lg font-medium text-white">TEAMS</h1>
            <Link href="/teams/add" className="w-fit">
              <Button
                className="flex h-[46px] items-center gap-2 text-white"
                variant="link"
              >
                <Plus />
                Add Team
              </Button>
            </Link>
          </>
        )}

        {!open && selectedTeam && (
          <TeamSelectorListElement isSelected team={selectedTeam} />
        )}
        <Button
          className="h-[46px] w-[46px] text-white"
          onClick={() => setOpen(state => !state)}
          variant="link"
        >
          {open ? <Minimize2 /> : <Maximize2 />}
        </Button>
      </article>
      <div
        className={cn(
          'flex max-h-80 flex-col gap-2 overflow-auto px-5 py-1 pr-[46px]',
          !open && 'hidden',
        )}
      >
        {teams.map(team => (
          <TeamSelectorListElement
            isSelected={team.id === selectedTeamId}
            key={team.id}
            team={team}
          />
        ))}
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage}
          isLoading={isFetchingNextPage}
        >
          {hasNextPage && <LoaderCircle size={24} className="animate-spin" />}
        </InfiniteScroll>
      </div>
    </div>
  );
};
