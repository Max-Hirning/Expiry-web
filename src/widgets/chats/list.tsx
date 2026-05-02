'use client';

import { useRouter } from 'next/navigation';

import { ChatsList } from 'features/chats';
import { useTeamStore } from 'shared/store';

export const ChatsListWidget = () => {
  const router = useRouter();
  const { selectedTeam } = useTeamStore();

  if (selectedTeam) {
    return (
      <ChatsList
        teamId={selectedTeam.id}
        onChatSelect={chat => router.push(`/chats/${chat.id}`)}
      />
    );
  }

  return null;
};
