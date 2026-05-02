'use client';

import { useParams, useRouter } from 'next/navigation';

import { useGetChat } from 'entities/chat';
import { ArrowLeft } from 'lucide-react';

import { ChatWindow } from 'features/chats';
import { useTeamStore } from 'shared/store';
import { Button } from 'shared/ui';

const ChatPage = () => {
  const router = useRouter();
  const { chatId } = useParams<{ chatId: string }>();
  const { selectedTeam } = useTeamStore();
  const teamId = selectedTeam?.id ?? '';

  const { data: chatData } = useGetChat({ teamId, chatId });
  const chatName = chatData?.data.chat.name ?? '';

  return (
    <>
      <header className="flex items-center gap-2 border-b px-4 py-3 header-position">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => router.push('/chats')}
        >
          <ArrowLeft size={14} />
        </Button>
        <span className="text-sm font-medium">{chatName}</span>
      </header>
      <main className="flex-1 overflow-hidden main-position">
        {teamId && <ChatWindow chatId={chatId} teamId={teamId} />}
      </main>
    </>
  );
};

export default ChatPage;
