'use client';

import { useCallback } from 'react';

import Link from 'next/link';

import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import {
  IChat,
  IChatResponse,
  IChatsResponse,
  useGetChat,
  useUpdateChat,
} from 'entities/chat';
import { ArrowLeft } from 'lucide-react';

import { QueryKeys } from 'shared/constants';
import { cn } from 'shared/lib';
import { ChatAiAgentVisibility } from 'shared/types';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from 'shared/ui';

interface Props {
  teamId: string;
  chatId: string;
  initialName: string;
}

interface PillProps {
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  label: string;
  tooltip: string;
}

const Pill = ({ active, disabled, onClick, label, tooltip }: PillProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'flex h-5 items-center justify-center rounded-full px-2 text-xs font-medium transition-colors',
          active
            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
          disabled && 'opacity-60',
        )}
      >
        {label}
      </button>
    </TooltipTrigger>
    <TooltipContent className="border border-input bg-white shadow">
      {tooltip}
    </TooltipContent>
  </Tooltip>
);

export const ChatHeader = ({ teamId, chatId, initialName }: Props) => {
  const queryClient = useQueryClient();
  const { data } = useGetChat({ teamId, chatId });
  const { mutate, isPending } = useUpdateChat();

  const chat = data?.data.chat;
  const name = chat?.name ?? initialName;
  const aiEnabled = chat?.aiAgentEnabled ?? false;
  const aiVisibility = chat?.aiAgentVisibility ?? ChatAiAgentVisibility.ALL;

  const applyOptimistic = useCallback(
    (patch: Partial<Pick<IChat, 'aiAgentEnabled' | 'aiAgentVisibility'>>) => {
      const singleFilter = {
        queryKey: [QueryKeys.GET_CHATS],
        predicate: (query: { queryKey: readonly unknown[] }) => {
          const key = query.queryKey as [QueryKeys, { chatId?: string }?];

          return key[1]?.chatId === chatId;
        },
      };
      const infiniteFilter = { queryKey: [QueryKeys.GET_INFINITE_CHATS] };

      const singleSnapshots =
        queryClient.getQueriesData<IChatResponse>(singleFilter);
      const infiniteSnapshots =
        queryClient.getQueriesData<InfiniteData<IChatsResponse>>(
          infiniteFilter,
        );

      queryClient.setQueriesData<IChatResponse>(singleFilter, old =>
        old
          ? {
              ...old,
              data: {
                ...old.data,
                chat: { ...old.data.chat, ...patch },
              },
            }
          : old,
      );

      queryClient.setQueriesData<InfiniteData<IChatsResponse>>(
        infiniteFilter,
        old =>
          old?.pages.length
            ? {
                ...old,
                pages: old.pages.map(page => ({
                  ...page,
                  data: {
                    ...page.data,
                    chats: page.data.chats.map(c =>
                      c.id === chatId ? { ...c, ...patch } : c,
                    ),
                  },
                })),
              }
            : old,
      );

      return () => {
        singleSnapshots.forEach(([key, value]) => {
          queryClient.setQueryData(key, value);
        });
        infiniteSnapshots.forEach(([key, value]) => {
          queryClient.setQueryData(key, value);
        });
      };
    },
    [chatId, queryClient],
  );

  const toggle = useCallback(
    (patch: Partial<Pick<IChat, 'aiAgentEnabled' | 'aiAgentVisibility'>>) => {
      const rollback = applyOptimistic(patch);

      mutate({ teamId, chatId, ...patch }, { onError: () => rollback() });
    },
    [applyOptimistic, chatId, mutate, teamId],
  );

  return (
    <header className="flex items-center gap-2 border-b px-4 py-3 header-position">
      <Link href="/chats">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <ArrowLeft size={14} />
        </Button>
      </Link>
      <span className="text-sm font-medium">{name}</span>
      <div className="ml-auto flex items-center gap-2">
        <Pill
          active={aiEnabled}
          disabled={isPending}
          onClick={() => toggle({ aiAgentEnabled: !aiEnabled })}
          label={aiEnabled ? 'AI on' : 'AI off'}
          tooltip={
            aiEnabled
              ? 'Click to disable the AI agent in this chat'
              : 'Click to enable the AI agent in this chat'
          }
        />
        {aiEnabled && (
          <Pill
            active={aiVisibility === ChatAiAgentVisibility.ALL}
            disabled={isPending}
            onClick={() =>
              toggle({
                aiAgentVisibility:
                  aiVisibility === ChatAiAgentVisibility.ALL
                    ? ChatAiAgentVisibility.SENDER_ONLY
                    : ChatAiAgentVisibility.ALL,
              })
            }
            label={
              aiVisibility === ChatAiAgentVisibility.ALL
                ? 'Visible: All'
                : 'Visible: Sender only'
            }
            tooltip={
              aiVisibility === ChatAiAgentVisibility.ALL
                ? 'AI replies are visible to everyone. Click to make them visible only to the sender.'
                : 'AI replies are visible only to the sender. Click to make them visible to everyone.'
            }
          />
        )}
      </div>
    </header>
  );
};
