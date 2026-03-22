'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IUser } from 'entities';
import { EllipsisVertical, History, Trash } from 'lucide-react';

import { cn } from 'shared/lib';
import { UserStatuses } from 'shared/types';
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui';

export const columns: ColumnDef<Omit<IUser, 'unReadNotifications'>>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex h-7 items-center px-4 py-1">
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={value => table.toggleAllRowsSelected(Boolean(value))}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex h-10 items-center px-4 py-2.5">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(Boolean(value))}
        />
      </div>
    ),
  },
  {
    accessorKey: 'fullName',
    header: () => (
      <p className="body-md h-7 truncate px-4 py-1 font-semibold">User</p>
    ),
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <p className="test-sm h-10 truncate px-4 py-2.5 font-normal text-gray-500">
          {id}
        </p>
      );
    },
  },
  {
    accessorKey: 'email',
    header: () => (
      <p className="body-md h-7 truncate px-4 py-1 font-semibold">Email</p>
    ),
    cell: ({ row }) => {
      const { email } = row.original;

      return (
        <p className="test-sm h-10 truncate px-4 py-2.5 font-normal text-gray-500">
          {email}
        </p>
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: () => (
      <p className="body-md h-7 truncate px-4 py-1 font-semibold">
        Phone number
      </p>
    ),
    cell: ({ row }) => {
      const { phoneNumber } = row.original;

      return (
        <p className="test-sm h-10 truncate px-4 py-2.5 font-normal text-gray-500">
          {phoneNumber}
        </p>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => (
      <p className="body-md h-7 truncate px-4 py-1 font-semibold">Status</p>
    ),
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <p className="test-sm h-10 truncate px-4 py-2.5 font-normal capitalize text-gray-900">
          {status.toLowerCase().replaceAll('_', ' ')}
        </p>
      );
    },
  },
  {
    accessorKey: 'action',
    header: () => <p />,
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <div className="test-sm h-10 px-4 py-2.5 font-normal text-gray-500">
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
              {status === UserStatuses.INVITED && (
                <DropdownMenuItem>
                  <History />
                  Resend invitation
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive">
                <Trash />
                Remove from team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
