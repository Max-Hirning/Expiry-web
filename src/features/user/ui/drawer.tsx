'use client';

import { format } from 'date-fns';
import { IUser, useGetActionLogsInfiniteScroll } from 'entities';
import {
  FileText,
  History,
  LoaderCircle,
  MessageSquare,
  SquareArrowOutUpRight,
  UserRound,
  X,
} from 'lucide-react';

import { useTeamStore } from 'shared/store';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  InfiniteScroll,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
  const { selectedTeam } = useTeamStore();
  const {
    data: actionLogsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetActionLogsInfiniteScroll({
    page: 1,
    teamId: selectedTeam?.id || '',
    perPage: 10,
  });
  const actionLogs =
    actionLogsData?.pages.map(({ data }) => data.actionLogs).flat(1) || [];

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
              <UserAvatar
                avatar={user.avatar}
                isOnline={user.isOnline}
                fullName={user.fullName}
              />
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

            <Tabs defaultValue="activity" className="px-4 py-3">
              <TabsList className="h-auto w-full items-center justify-start gap-1 rounded-xl bg-gray-100 p-1">
                <TabsTrigger
                  value="activity"
                  className="w-fit gap-2 rounded-lg py-1 text-sm font-medium text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                >
                  <History size={16} />
                  Activity
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="w-fit gap-2 rounded-lg py-1 text-sm font-medium text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                >
                  <FileText size={16} />
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="chats"
                  className="w-fit gap-2 rounded-lg py-1 text-sm font-medium text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                >
                  <MessageSquare size={16} />
                  Chats
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                {/* <div className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-gray-400">
                  <History size={32} className="text-gray-300" />
                  No activity yet
                </div> */}
                {actionLogs.map(actionLog => (
                  <p key={actionLog.id}>{actionLog.type}</p>
                ))}
                <InfiniteScroll
                  next={fetchNextPage}
                  hasMore={hasNextPage}
                  isLoading={isFetchingNextPage}
                >
                  {hasNextPage && (
                    <LoaderCircle size={24} className="animate-spin" />
                  )}
                </InfiniteScroll>
              </TabsContent>
              <TabsContent value="documents">
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-gray-400">
                  <FileText size={32} className="text-gray-300" />
                  No documents yet
                </div>
              </TabsContent>
              <TabsContent value="chats">
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-gray-400">
                  <MessageSquare size={32} className="text-gray-300" />
                  No chats yet
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
