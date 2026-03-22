'use client';

import { FC, useState } from 'react';

import { IDocument } from 'entities/document';
import { EllipsisVertical, Pencil, Trash, Upload } from 'lucide-react';

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

import { DocumentDeleteAlert } from './alert';

interface IProps {
  document: Omit<IDocument, 'files'>;
  isLast: boolean;
}

export const DocumentsListElement: FC<IProps> = ({ isLast, document }) => {
  const { selectedTeam, selectedDocumentIds, toggleSelectedDocumentId } =
    useTeamStore();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={cn(
        'flex items-center gap-4 border-b px-4 py-2',
        isLast && 'border-none',
      )}
    >
      <Checkbox
        className="mr-8"
        checked={selectedDocumentIds.has(document.id)}
        onCheckedChange={() => toggleSelectedDocumentId(document.id)}
      />
      <p className="flex-1 text-sm">{document.name}</p>
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
