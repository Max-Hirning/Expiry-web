'use client';

import { FC, useState } from 'react';

import { IDocument } from 'entities/document';
import { EllipsisVertical, Pencil, Trash, Upload } from 'lucide-react';

import { cn } from 'shared/lib';
import { useTeamStore } from 'shared/store';
import {
  ActionLogTypeBadge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui';

import { DocumentDeleteAlert } from './alert';

interface IProps {
  document: Omit<IDocument, 'files'>;
  hideCheckbox?: boolean;
  isLast: boolean;
  actorId?: string;
  onRowClick?: (document: Omit<IDocument, 'files'>) => void;
}

export const DocumentsListElement: FC<IProps> = ({
  hideCheckbox,
  actorId,
  isLast,
  onRowClick,
  document,
}) => {
  const { selectedTeam, selectedDocumentIds, toggleSelectedDocumentId } =
    useTeamStore();
  const [open, setOpen] = useState<boolean>(false);
  const actions = actorId
    ? Array.from(new Set(document.actions[actorId] || []))
    : [];

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-4 border-b px-4 py-2 transition-colors hover:bg-gray-50',
        isLast && 'border-none',
      )}
      onClick={() => onRowClick && onRowClick(document)}
    >
      <Checkbox
        className={cn('mr-8', hideCheckbox && 'hidden')}
        checked={selectedDocumentIds.has(document.id)}
        onCheckedChange={() => toggleSelectedDocumentId(document.id)}
        onClick={event => event.stopPropagation()}
      />
      <p className="flex-1 text-sm">{document.name}</p>
      {actions.map(action => (
        <ActionLogTypeBadge key={action} type={action} />
      ))}
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
            Create new version
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
        <DocumentDeleteAlert
          open={open}
          onOpenChange={setOpen}
          teamId={selectedTeam.id}
          documentId={document.id}
        />
      )}
    </div>
  );
};
