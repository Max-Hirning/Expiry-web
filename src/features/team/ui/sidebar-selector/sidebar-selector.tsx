'use client';

import { useEffect, useState } from 'react';

import { useGetTeamsInfiniteScroll } from 'entities/team';
import { ChevronDown, LoaderCircle } from 'lucide-react';

import { cn } from 'shared/lib';
import { useTeamStore } from 'shared/store';
import {
  InfiniteScroll,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'shared/ui';

import { useSelectTeam } from '../../hooks';

type Props = {
  selectedTeamId: string | null;
};

export const TeamSidebarSelector = ({ selectedTeamId }: Props) => {
  const { selectedTeam } = useTeamStore();
  const selectTeam = useSelectTeam();
  const [open, setOpen] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetTeamsInfiniteScroll({
      limit: 10,
      sortField: 'createdAt',
      sortOrder: 'desc',
    });
  const teams = data?.pages.flatMap(({ data }) => data.teams) ?? [];

  useEffect(() => {
    if (selectedTeam || teams.length === 0) {
      return;
    }
    const fromCookie = selectedTeamId
      ? teams.find(t => t.id === selectedTeamId)
      : null;
    const target = fromCookie ?? teams[0];

    if (target) {
      selectTeam(target);
    }
  }, [teams, selectedTeam, selectedTeamId]);

  if (!selectedTeam) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="mb-2 flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-2 text-left"
        >
          <img
            src={selectedTeam.logo?.url}
            width={40}
            height={40}
            alt={`${selectedTeam.name} logo`}
            className="rounded-full"
          />
          <p className="flex-1 truncate text-base font-semibold">
            {selectedTeam.name}
          </p>
          <ChevronDown size={16} className="text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[176px] p-1">
        <ul className="flex max-h-72 flex-col gap-0.5 overflow-auto">
          {teams.map(team => (
            <li key={team.id}>
              <button
                type="button"
                onClick={() => {
                  selectTeam(team);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-gray-100',
                  team.id === selectedTeam.id && 'bg-gray-100 font-semibold',
                )}
              >
                <img
                  src={team.logo?.url}
                  width={24}
                  height={24}
                  alt=""
                  className="rounded-full"
                />
                <span className="truncate">{team.name}</span>
              </button>
            </li>
          ))}
          <InfiniteScroll
            next={fetchNextPage}
            hasMore={hasNextPage}
            isLoading={isFetchingNextPage}
          >
            {hasNextPage && <LoaderCircle size={20} className="animate-spin" />}
          </InfiniteScroll>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
