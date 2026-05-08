'use client';

import { FC, useState } from 'react';

import { useRouter } from 'next/navigation';

import { format } from 'date-fns';
import { ITeam } from 'entities/team';
import { ChessQueen, EllipsisVertical, Pencil, Trash2 } from 'lucide-react';

import { cn } from 'shared/lib';
import { TeamMemberRoles } from 'shared/types';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui';

import { useSelectTeam } from '../../hooks';
import { TeamDeleteAlert } from '../alert';
import { TeamStatProgress } from '../stat-progress';

interface IProps {
  team: ITeam;
  className?: string;
  isSelected: boolean;
}

export const TeamSelectorListElement: FC<IProps> = ({
  isSelected,
  team,
  className,
}) => {
  const { push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const selectTeam = useSelectTeam();

  return (
    <>
      <div
        onClick={() => selectTeam(team)}
        className={cn(
          'flex w-full cursor-pointer items-center gap-2',
          className,
        )}
      >
        <p
          className={cn(
            'whitespace-nowrap text-base text-gray-400',
            !isSelected && 'opacity-0',
          )}
        >
          Active Team:
        </p>
        <article className="flex h-[54px] w-full items-center gap-2 rounded-full bg-gray-100 p-1 pl-5">
          <h1 className="flex items-center gap-1 whitespace-nowrap text-lg font-medium text-black">
            {team.name}
            <ChessQueen
              size={16}
              className={cn(
                'text-yellow-500',
                team.currentMember.role !== TeamMemberRoles.ADMIN && 'hidden',
              )}
            />
          </h1>
          <p className="whitespace-nowrap text-gray-600">
            {format(team.createdAt, 'MMM dd')}
          </p>
          <TeamStatProgress team={team} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="h-[46px] w-[46px] bg-white text-black"
                variant="link"
              >
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => push(`/teams/${team.id}/edit`)}
                className="flex items-center gap-2"
              >
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 text-destructive data-[highlighted]:text-destructive"
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </article>
      </div>
      <TeamDeleteAlert teamId={team.id} open={open} onOpenChange={setOpen} />
    </>
  );
};
