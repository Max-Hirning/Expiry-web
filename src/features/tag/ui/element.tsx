'use client';

import { FC, useState } from 'react';

import { ITag } from 'entities/tag';
import {
  ChevronDown,
  EllipsisVertical,
  Pencil,
  Trash,
  Upload,
} from 'lucide-react';

import { cn } from 'shared/lib';
import { useTeamStore } from 'shared/store';
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui';

import { TagDeleteAlert } from './alert';

interface IProps {
  tag: ITag;
}

export const TagsListElement: FC<IProps> = ({ tag }) => {
  const { selectedTeam, selectedTagsIds, toggleSelectedTagId } = useTeamStore();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={cn('flex w-full items-center gap-4 px-4 py-2')}>
      <Checkbox
        checked={selectedTagsIds.has(tag.id)}
        onCheckedChange={() => toggleSelectedTagId(tag.id)}
      />
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
      <span className="flex-1">{tag.tag}</span>
      <span className="rounded-full bg-gray-300 px-[10px] py-[2px] text-xs">
        {tag.documents} document{tag.documents > 1 ? 's' : ''}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-7 w-7 border-none bg-transparent p-0 shadow-none"
            variant="outline"
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <DropdownMenuItem>
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Upload />
            Create new document
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-destructive"
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedTeam && (
        <TagDeleteAlert
          open={open}
          onOpenChange={setOpen}
          teamId={selectedTeam.id}
          tagId={tag.id}
        />
      )}
    </div>
  );
};
