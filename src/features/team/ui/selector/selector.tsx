'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useGetTeamsInfiniteScroll } from 'entities/team';
import { LoaderCircle, Maximize2, Minimize2, Plus } from 'lucide-react';

import { cn } from 'shared/lib';
import { useTeamStore } from 'shared/store';
import { Button, InfiniteScroll } from 'shared/ui';

import { TeamSelectorListElement } from './element';

export const TeamSelector = () => {
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
  const teams = teamsData?.pages.map(({ data }) => data.teams).flat(1) || [];

  const [open, setOpen] = useState<boolean>(false);

  const { selectTeam, selectedTeam } = useTeamStore();

  useEffect(() => {
    const team = teams[0];

    if (selectedTeam === null && team) {
      selectTeam(team);
    }
  }, [teams]);

  return (
    <div
      className={cn(
        'w-full rounded-full bg-black',
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
            isSelected={team.id === selectedTeam?.id}
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
