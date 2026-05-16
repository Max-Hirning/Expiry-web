'use client';

import { FC } from 'react';

import { ChatWindow } from 'features/chats';
import { useTeamStore } from 'shared/store';

interface Props {
  chatId: string;
  teamIdSSR: string | null;
}

export const ChatWindowWidget: FC<Props> = ({ chatId, teamIdSSR }) => {
  const { selectedTeam } = useTeamStore();
  const teamId = selectedTeam?.id ?? teamIdSSR ?? '';

  if (!teamId) {
    return null;
  }

  return <ChatWindow chatId={chatId} teamId={teamId} />;
};
