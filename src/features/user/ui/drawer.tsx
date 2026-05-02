'use client';

import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { IUser, useUpdateUserPosition } from 'entities';
import { Permissions, usePermissions } from 'entities/auth';
import {
  ArrowLeft,
  FileText,
  History,
  MessageSquare,
  SquareArrowOutUpRight,
  X,
} from 'lucide-react';

import { ActionLogsList } from 'features/action-log';
import { ChatsList, ChatWindow } from 'features/chats';
import { DocumentsList } from 'features/document';
import { cn } from 'shared/lib';
import { TeamMemberRoles } from 'shared/types';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
  user: Omit<IUser, 'unReadNotifications' | 'teamMembers'> | null;
  open: boolean;
  teamId: string;
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

export const UserDrawer = ({
  user,
  teamId,
  open,
  onClose,
}: UserDrawerProps) => {
  const [selectedChat, setSelectedChat] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [liveUser, setLiveUser] = useState(user);
  const { mutate: updateUserPosition, isPending: isUpdateUserPosition } =
    useUpdateUserPosition();
  const permissions = usePermissions({
    permissions: [Permissions.UPDATE_USER_TEAM_POSITION],
    teamId,
  });

  useEffect(() => {
    setLiveUser(user);
  }, [user]);

  useEffect(() => {
    if (!open) {
      setSelectedChat(null);
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[70vw] max-w-[680px] p-0 [&>button]:hidden"
      >
        {liveUser && (
          <>
            <header className="flex items-center gap-4 border-b px-4 py-3">
              <Breadcrumb className="flex-1">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <span>Teammates</span>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{liveUser?.fullName}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
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
                avatar={liveUser?.avatar}
                isOnline={liveUser?.isOnline}
                fullName={liveUser?.fullName}
              />
              <div className="flex flex-col gap-0.5">
                <UserStatusBadge status={liveUser?.status} />
                <SheetTitle className="text-lg font-medium">
                  {liveUser?.fullName}
                </SheetTitle>
              </div>
            </SheetHeader>

            <dl className="flex flex-col gap-4 px-4 py-3">
              <DrawerRow
                label="Invited at"
                value={
                  liveUser?.invitedAt
                    ? format(new Date(liveUser.invitedAt), 'MMM d, yyyy, h:mma')
                    : '—'
                }
              />
              <DrawerRow
                label="Position"
                value={
                  liveUser?.position ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          disabled={
                            isUpdateUserPosition ||
                            !permissions[Permissions.UPDATE_USER_TEAM_POSITION]
                          }
                          className="h-fit w-fit bg-transparent p-0"
                        >
                          <TeamMemberRoleBadge role={liveUser.position} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex w-fit flex-col items-center justify-center gap-2 p-2">
                        {Object.values(TeamMemberRoles).map(teamMemberRole => {
                          if (TeamMemberRoles.OWNER === teamMemberRole) {
                            return null;
                          }

                          return (
                            <Button
                              key={teamMemberRole}
                              onClick={() =>
                                updateUserPosition(
                                  {
                                    userId: user!.id,
                                    teamId,
                                    role: teamMemberRole,
                                  },
                                  {
                                    onSuccess: data =>
                                      setLiveUser(prev =>
                                        prev
                                          ? {
                                              ...prev,
                                              position: data.data.role,
                                            }
                                          : prev,
                                      ),
                                  },
                                )
                              }
                              disabled={
                                isUpdateUserPosition ||
                                !permissions[
                                  Permissions.UPDATE_USER_TEAM_POSITION
                                ]
                              }
                              variant="ghost"
                              className={cn(
                                'h-fit w-fit cursor-pointer bg-transparent p-0',
                                teamMemberRole === liveUser.position &&
                                  'cursor-not-allowed',
                              )}
                            >
                              <TeamMemberRoleBadge role={teamMemberRole} />
                            </Button>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  ) : (
                    '—'
                  )
                }
              />
              <DrawerRow label="User email" value={liveUser?.email} />
              <DrawerRow
                label="Last login at"
                value={
                  liveUser?.lastLoginAt
                    ? format(
                        new Date(liveUser.lastLoginAt),
                        'MMM d, yyyy, h:mma',
                      )
                    : '—'
                }
              />
            </dl>

            <Tabs
              defaultValue="activity"
              className="h-[calc(100%-156px-82px-60.8px)] px-4 py-3"
            >
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

              <TabsContent
                value="activity"
                className="h-[calc(100%-36px-8px)] overflow-auto"
              >
                <ActionLogsList
                  actorIds={liveUser ? [liveUser.id] : undefined}
                />
              </TabsContent>
              <TabsContent
                value="documents"
                className="h-[calc(100%-36px-8px)] overflow-auto"
              >
                <DocumentsList
                  hideCheckbox
                  actorId={liveUser?.id || undefined}
                  filters={{
                    authorsIds: liveUser ? [liveUser.id] : undefined,
                  }}
                />
              </TabsContent>
              <TabsContent
                value="chats"
                className="flex h-[calc(100%-36px-8px)] flex-col"
              >
                {selectedChat ? (
                  <>
                    <div className="flex items-center gap-2 border-b px-1 py-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setSelectedChat(null)}
                      >
                        <ArrowLeft size={14} />
                      </Button>
                      <span className="text-sm font-medium">
                        {selectedChat.name}
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <ChatWindow chatId={selectedChat.id} teamId={teamId} />
                    </div>
                  </>
                ) : (
                  <div className="overflow-auto">
                    <ChatsList teamId={teamId} onChatSelect={setSelectedChat} />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
