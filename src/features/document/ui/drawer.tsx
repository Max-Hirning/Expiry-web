'use client';

import { format } from 'date-fns';
import { useGetChat } from 'entities/chat';
import { IDocumentListItem } from 'entities/document';
import { FileText, History, MessageSquare, X } from 'lucide-react';

import { ActionLogsList } from 'features/action-log';
import { ChatWindow } from 'features/chats';
import { useTeamStore } from 'shared/store';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  DocumentStatusBadge,
  RiskLevelBadge,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'shared/ui';

import { FilesList } from './files-list';

interface DocumentDrawerProps {
  document: IDocumentListItem | null;
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

export const DocumentDrawer = ({
  document,
  open,
  onClose,
  teamId,
}: DocumentDrawerProps) => {
  const { selectedTeam } = useTeamStore();
  const { data: chatData } = useGetChat({
    chatId: document?.chat?.id || '',
    teamId,
  });

  const chat = chatData?.data.chat || document?.chat;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[70vw] max-w-[680px] p-0 [&>button]:hidden"
      >
        {document && (
          <>
            <header className="flex items-center gap-4 border-b px-4 py-3">
              <Breadcrumb className="flex-1">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <span>Documents</span>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{document.name}</BreadcrumbPage>
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
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <DocumentStatusBadge status={document.status} />
                  {document.riskLevel && (
                    <RiskLevelBadge level={document.riskLevel} />
                  )}
                </div>
                <SheetTitle className="text-lg font-medium">
                  {document.name}
                </SheetTitle>
              </div>
            </SheetHeader>

            <dl className="flex flex-col gap-4 px-4 py-3">
              <DrawerRow
                label="Created at"
                value={format(
                  new Date(document.createdAt),
                  'MMM d, yyyy, h:mma',
                )}
              />
              <DrawerRow
                label="Updated at"
                value={format(
                  new Date(document.updatedAt),
                  'MMM d, yyyy, h:mma',
                )}
              />
              <DrawerRow
                label="Expires at"
                value={
                  document.expiresAt
                    ? format(new Date(document.expiresAt), 'MMM d, yyyy, h:mma')
                    : '—'
                }
              />
            </dl>

            <Tabs
              defaultValue="activity"
              className="h-[calc(100%-119px-74px-60.8px)] px-4 py-3"
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
                  value="files"
                  className="w-fit gap-2 rounded-lg py-1 text-sm font-medium text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                >
                  <FileText size={16} />
                  Files
                </TabsTrigger>
                {chat && (
                  <TabsTrigger
                    value="chats"
                    className="w-fit gap-2 rounded-lg py-1 text-sm font-medium text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                  >
                    <MessageSquare size={16} />
                    {chat.name}
                    {chat.unreadCount ? (
                      <span className="ml-1 rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                        {chat.unreadCount}
                      </span>
                    ) : null}
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent
                value="activity"
                className="h-[calc(100%-36px-8px)] overflow-auto"
              >
                <ActionLogsList
                  documentIds={document ? [document?.id] : undefined}
                />
              </TabsContent>
              <TabsContent
                value="files"
                className="h-[calc(100%-36px-8px)] overflow-auto"
              >
                <FilesList documentId={document.id} teamId={teamId} />
              </TabsContent>
              {document.chat && (
                <TabsContent value="chats" className="h-[calc(100%-36px-8px)]">
                  <ChatWindow
                    chatId={document.chat.id}
                    teamId={selectedTeam?.id ?? ''}
                  />
                </TabsContent>
              )}
            </Tabs>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
