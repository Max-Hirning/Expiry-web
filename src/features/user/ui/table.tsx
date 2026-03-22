'use client';

import { useMemo } from 'react';

import { useGetTagsInfiniteScroll, useGetUsers } from 'entities';
import {
  ChevronDown,
  EllipsisVertical,
  LoaderCircle,
  Pencil,
  Trash,
  Upload,
} from 'lucide-react';

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
  Checkbox,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui';

import { columns } from '../constants';

export const UsersTable = () => {
  const {
    selectedTeam,
    tagsAndDocumentsFilters,
    selectedTagsIds,
    toggleSelectedTagId,
    resetSelectedTagIds,
    resetSelectedDocumentIds,
    selectedDocumentIds,
  } = useTeamStore();

  const { data: users, isLoading } = useGetUsers({
    page: 1,
    perPage: 10,
    teamId: selectedTeam?.id || '',
  });

  return <DataTable columns={columns} data={users?.data.users || []} />;
};
