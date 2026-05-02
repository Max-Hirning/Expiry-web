'use client';

import { useMemo } from 'react';

import { useGetTagsInfiniteScroll } from 'entities/tag';
import { LoaderCircle, Trash, Upload } from 'lucide-react';

import { DocumentsList } from 'features/document';
import { cn } from 'shared/lib';
import { useTeamStore } from 'shared/store';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  BulkMenu,
  Button,
  InfiniteScroll,
} from 'shared/ui';

import { TagsListElement } from './element';

export const TagsList = () => {
  const {
    selectedTeam,
    tagsAndDocumentsFilters,
    selectedTagsIds,
    resetSelectedTagIds,
    resetSelectedDocumentIds,
    selectedDocumentIds,
  } = useTeamStore();

  const {
    data: tagsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTagsInfiniteScroll({
    limit: 10,
    teamId: selectedTeam?.id || '',
    ...(tagsAndDocumentsFilters || {}),
  });
  const tags = tagsData?.pages.flatMap(page => page.data.tags) ?? [];

  const documentsCounter = useMemo(
    () => tags.reduceRight((res, tag) => res + tag.documents, 0),
    [tags],
  );

  if (isLoading) {
    return <LoaderCircle size={24} className="m-auto my-4 animate-spin" />;
  }

  if (tags.length === 0) {
    return <p className="m-auto text-base">No Documents found</p>;
  }

  return (
    <>
      <p className="sticky top-0 z-50 bg-white pb-2 text-sm text-gray-400">
        {documentsCounter} search result{documentsCounter > 1 ? 's' : ''}
      </p>
      <Accordion
        type="multiple"
        defaultValue={[]}
        className="w-full rounded-lg border shadow-sm"
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
                  'group justify-start gap-4 bg-gray-50 p-0',
                  index === 0 && 'rounded-t-lg',
                  index + 1 === tags.length &&
                    'data-[state=closed]:rounded-b-lg',
                )}
              >
                <TagsListElement tag={tag} />
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <DocumentsList
                  filters={{
                    ...(tagsAndDocumentsFilters || {}),
                    tagsIds: [tag.id],
                  }}
                  type="child"
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage}
        isLoading={isFetchingNextPage}
      >
        {hasNextPage && (
          <div className="flex justify-center py-4">
            <LoaderCircle size={24} className="animate-spin text-zinc-400" />
          </div>
        )}
      </InfiniteScroll>
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
