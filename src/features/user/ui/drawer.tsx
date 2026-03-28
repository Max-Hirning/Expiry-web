'use client';

import { format } from 'date-fns';
import { IUser } from 'entities';
import { SquareArrowOutUpRight, X } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  TeamMemberRoleBadge,
  UserAvatar,
  UserStatusBadge,
} from 'shared/ui';

interface UserDrawerProps {
  user: Omit<IUser, 'unReadNotifications'> | null;
  open: boolean;
  onClose: () => void;
}

interface DrawerRowProps {
  label: string;
  value: React.ReactNode;
}

const DrawerRow = ({ label, value }: DrawerRowProps) => {
  return (
    <div className="flex h-[21px] items-center gap-6">
      <dt className="w-40 shrink-0 text-sm text-gray-500">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  );
};

export const UserDrawer = ({ user, open, onClose }: UserDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[70vw] max-w-[680px] p-0 [&>button]:hidden"
      >
        {user && (
          <>
            <header className="flex items-center gap-4 border-b px-4 py-3">
              <Breadcrumb className="flex-1">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <span>Teammates</span>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{user.fullName}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 rounded-full shadow-sm"
              >
                <SquareArrowOutUpRight size={16} />
                Full page
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full shadow-sm"
                onClick={onClose}
              >
                <X size={16} />
              </Button>
            </header>

            <SheetHeader className="flex-row items-center gap-3 px-4 py-3">
              <UserAvatar avatar={user.avatar} fullName={user.fullName} />
              <div className="flex flex-col gap-0.5">
                <UserStatusBadge status={user.status} />
                <SheetTitle className="text-lg font-medium">
                  {user.fullName}
                </SheetTitle>
              </div>
            </SheetHeader>

            <dl className="flex flex-col gap-4 px-4 py-3">
              <DrawerRow
                label="Invited at"
                value={
                  user.invitedAt
                    ? format(new Date(user.invitedAt), 'MMM d, yyyy, h:mma')
                    : '—'
                }
              />
              <DrawerRow
                label="Position"
                value={
                  user.position ? (
                    <TeamMemberRoleBadge role={user.position} />
                  ) : (
                    '—'
                  )
                }
              />
              <DrawerRow label="User email" value={user.email} />
              <DrawerRow
                label="Last login at"
                value={
                  user.lastLoginAt
                    ? format(new Date(user.lastLoginAt), 'MMM d, yyyy, h:mma')
                    : '—'
                }
              />
            </dl>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
