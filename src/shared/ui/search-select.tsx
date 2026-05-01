'use client';

import { ReactElement, useEffect, useRef, useState } from 'react';

import { ChevronDown, LoaderCircle } from 'lucide-react';

import { cn } from 'shared/lib';

import { InfiniteScroll } from './infinite-scroll';
import {
  Button,
  Checkbox,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from './shadcn';

interface IProps<T> {
  data: T[];
  selectionType: 'multiple' | 'single';
  isLoading?: boolean;
  onSelect: (value: T) => void;
  elLabel: (value: T) => string | ReactElement;
  elIsSelected: (value: T) => boolean;
  buttonLabel: () => string | void;
  placeholder: string;
  className?: string;
  searchPlaceholder: string;
  search?: string;
  disabled?: boolean;
  setSearch?: (value: string) => void;
  fetchNextPage: () => void;
  listClassName?: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const SearchSelect = <T,>({
  data = [],
  search,
  elLabel,
  selectionType,
  listClassName,
  className,
  onSelect,
  isLoading,
  buttonLabel,
  setSearch,
  hasNextPage,
  placeholder,
  searchPlaceholder,
  disabled,
  elIsSelected,
  fetchNextPage,
  isFetchingNextPage,
}: IProps<T>) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [contentWidth, setContentWidth] = useState<number>();

  useEffect(() => {
    if (!triggerRef.current) {
      return;
    }

    const element = triggerRef.current;

    const observer = new ResizeObserver(([entry]) => {
      const { width } = entry.target.getBoundingClientRect();

      setContentWidth(width);
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [triggerRef.current]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between capitalize', className)}
        >
          {buttonLabel() || placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: contentWidth }} className="p-0">
        {setSearch && (
          <Input
            type="search"
            onChange={event => setSearch(event.target.value)}
            value={search}
            className="rounded-none border-x-0 !border-b border-t-0 shadow-none focus-visible:ring-0 focus-visible:ring-ring"
            placeholder={searchPlaceholder}
          />
        )}
        <div
          className={cn(
            'flex h-40 flex-col items-center justify-center',
            listClassName,
          )}
        >
          <ScrollArea
            className={cn(
              'h-full w-full',
              (!(data.length > 0) || isLoading) && 'hidden',
            )}
          >
            {data.map(element => (
              <Button
                disabled={disabled}
                key={JSON.stringify(element)}
                onClick={() => {
                  onSelect(element);
                }}
                variant="ghost"
                className="rounded-6 hover:bg-gray-98 hover:text-small-leading-normal-regular group flex h-fit w-full cursor-pointer justify-between gap-2 p-0 px-2 py-[10px]"
              >
                <article className="flex items-center gap-2">
                  <Checkbox
                    checked={elIsSelected(element)}
                    className={cn(
                      'h-4 w-4 rounded-sm',
                      selectionType !== 'multiple' && 'hidden',
                    )}
                  />
                  <div
                    className={cn(
                      'flex h-4 w-4 items-center justify-center rounded-full border border-gray-400',
                      selectionType !== 'single' && 'hidden',
                    )}
                  >
                    <div
                      className={cn(
                        'h-1.5 w-1.5 rounded-full bg-primary',
                        !elIsSelected(element) && 'hidden',
                      )}
                    />
                  </div>
                  <p className="text-small-leading-normal-regular text-wrap text-start capitalize">
                    {elLabel(element)}
                  </p>
                </article>
              </Button>
            ))}
            <InfiniteScroll
              next={fetchNextPage}
              hasMore={hasNextPage}
              isLoading={isFetchingNextPage}
            >
              {hasNextPage && (
                <LoaderCircle size={24} className="m-auto my-4 animate-spin" />
              )}
            </InfiniteScroll>
          </ScrollArea>
          <p
            className={cn(
              'text-center text-sm',
              (data.length > 0 || isLoading) && 'hidden',
            )}
          >
            No data
          </p>
          <LoaderCircle
            className={cn('animate-spin-infinite', !isLoading && 'hidden')}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
