'use client';

import { FC } from 'react';

import {
  IGetDocumentsParams,
  useGetDocumentsInfiniteScroll,
} from 'entities/document';
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

interface IProps extends Pick<IGetDocumentsParams, 'tagsIds'> {}

export const DocumentsList: FC<IProps> = ({ tagsIds }) => {
  const {
    selectedTeam,
    selectedDocumentIds,
    toggleSelectedDocumentId,
    tagsAndDocumentsFilters,
  } = useTeamStore();

  const { data: documentsData } = useGetDocumentsInfiniteScroll({
    page: 1,
    tagsIds,
    perPage: 10,
    teamId: selectedTeam?.id || '',
    ...(tagsAndDocumentsFilters || {}),
  });
  const documents =
    documentsData?.pages.flatMap(page => page.data.documents) ?? [];

  return (
    <>
      {documents.map((document, index) => {
        return (
          <div
            key={document.id}
            className={cn(
              'flex items-center gap-4 border-b px-4 py-2',
              index + 1 === documents.length && 'border-none',
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
                <DropdownMenuItem className="text-destructive">
                  <Trash />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      })}
    </>
  );
};
