'use client';

import { FC, useMemo } from 'react';

import {
  IGetDocumentsParams,
  useGetDocumentsInfiniteScroll,
} from 'entities/document';
import { useGetTagsInfiniteScroll } from 'entities/tag';
import {
  ChevronDown,
  EllipsisVertical,
  LoaderCircle,
  Pencil,
  Plus,
  Trash,
  Upload,
  X,
} from 'lucide-react';

import { TeamSelector } from 'features';
import { cn } from 'shared/lib';
import { useTeamStore } from 'shared/store';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  BulkMenu,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
} from 'shared/ui';

interface IProps extends Pick<IGetDocumentsParams, 'tagsIds'> {}

const DocumentsList: FC<IProps> = ({ tagsIds }) => {
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

  console.log(Array.from(selectedDocumentIds));

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

const Page = () => {
  const {
    selectedTeam,
    tagsAndDocumentsFilters,
    selectedTagsIds,
    selectedDocumentIds,
    toggleSelectedTagId,
    updateTagsAndDocumentsFilters,
    resetSelectedTagIds,
    resetSelectedDocumentIds,
  } = useTeamStore();

  const { data: tagsData, isLoading } = useGetTagsInfiniteScroll({
    page: 1,
    perPage: 10,
    teamId: selectedTeam?.id || '',
    ...(tagsAndDocumentsFilters || {}),
  });
  const tags = tagsData?.pages.flatMap(page => page.data.tags) ?? [];

  const documentsCounter = useMemo(
    () => tags.reduceRight((res, tag) => res + tag.documents, 0),
    [tags],
  );

  return (
    <>
      <header className="sticky top-0 flex !h-fit flex-col gap-4 p-4 header-position">
        <TeamSelector />
        <section className="flex w-full items-center justify-end gap-4">
          <Input
            type="search"
            value={tagsAndDocumentsFilters?.search}
            onChange={event =>
              updateTagsAndDocumentsFilters({
                search: event.target.value,
              })
            }
            className="w-[373px]"
          />
          <Button className="flex items-center justify-center gap-2">
            <Plus />
            Add
          </Button>
        </section>
      </header>
      <main className="flex !h-[calc(100%-158px)] flex-col overflow-auto p-4 pt-0 main-position">
        <p
          className={cn(
            'sticky top-0 z-50 bg-white pb-2 text-sm text-gray-400',
            isLoading && 'hidden',
          )}
        >
          {documentsCounter} search result{documentsCounter > 1 ? 's' : ''}
        </p>
        <Accordion
          type="multiple"
          defaultValue={[]}
          className={cn(
            'w-full rounded-lg border shadow-sm',
            (tags.length === 0 || isLoading) && 'hidden',
          )}
        >
          {tags.map((tag, index) => {
            return (
              <AccordionItem
                className={cn(
                  index + 1 === tags.length && 'rounded-b-lg border-none',
                )}
                key={tag.id}
                value={tag.id}
              >
                <AccordionTrigger
                  hideIcon
                  className={cn(
                    'justify-start gap-4 bg-gray-50 px-4 py-2',
                    index === 0 && 'rounded-t-lg',
                    index + 1 === tags.length &&
                      'data-[state=closed]:rounded-b-lg',
                  )}
                >
                  <Checkbox
                    checked={selectedTagsIds.has(tag.id)}
                    onCheckedChange={() => toggleSelectedTagId(tag.id)}
                  />
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
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
                      <DropdownMenuItem className="text-destructive">
                        <Trash />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <DocumentsList tagsIds={[tag.id]} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <LoaderCircle
          size={24}
          className={cn('m-auto my-4 animate-spin', !isLoading && 'hidden')}
        />
        <p
          className={cn(
            'm-auto text-base',
            !(tags.length === 0 && !isLoading) && 'hidden',
          )}
        >
          No Documents found
        </p>
      </main>
      <BulkMenu
        onResetAction={resetSelectedTagIds}
        selectedAmount={selectedTagsIds.size}
        totalAmount={tags.length}
      >
        <Button
          variant="link"
          className="flex h-8 items-center justify-center gap-2 px-3 py-2 text-xs text-white no-underline"
        >
          <Upload />
          Create new document
        </Button>
        <Button
          variant="destructive"
          className="flex h-8 items-center justify-center gap-2 px-3 py-2 text-xs"
        >
          <Trash />
          Delete
        </Button>
      </BulkMenu>
      <BulkMenu
        onResetAction={resetSelectedDocumentIds}
        selectedAmount={selectedDocumentIds.size}
        totalAmount={documentsCounter}
        className="bottom-14"
      >
        <Button
          variant="link"
          className="flex h-8 items-center justify-center gap-2 px-3 py-2 text-xs text-white no-underline"
        >
          <Upload />
          Create new version
        </Button>
        <Button
          variant="destructive"
          className="flex h-8 items-center justify-center gap-2 px-3 py-2 text-xs"
        >
          <Trash />
          Delete
        </Button>
      </BulkMenu>
    </>
  );
};

export default Page;
