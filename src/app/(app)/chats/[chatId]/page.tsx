import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getUserSession } from 'entities/auth';
import { getChat, getMessages, IGetMessagesParams } from 'entities/chat';
import { ArrowLeft } from 'lucide-react';

import { ChatWindowWidget } from 'widgets';
import { QueryKeys } from 'shared/constants';
import { makeQueryClient } from 'shared/lib';
import { Button } from 'shared/ui';

interface Props {
  params: Promise<{ chatId: string }>;
}

const MESSAGES_LIMIT = 15;

const ChatPage = async ({ params }: Props) => {
  const { chatId } = await params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const queryClient = makeQueryClient();

  let teamId: string | null = null;
  let chatName = '';

  try {
    const userSession = await getUserSession();

    teamId = userSession.selectedTeamId;

    if (!teamId) {
      redirect('/chats');
    }

    const chatParams = { teamId, chatId };
    const messagesParams: IGetMessagesParams = {
      teamId,
      chatId,
      limit: MESSAGES_LIMIT,
    };
    const chatResponse = await getChat(chatParams, undefined, {
      Cookie: cookieHeader,
    });

    chatName = chatResponse.data.chat.name;

    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: [QueryKeys.GET_CHATS, chatParams],
        queryFn: () => chatResponse,
      }),
      queryClient.prefetchInfiniteQuery({
        queryKey: [QueryKeys.GET_INFINITE_MESSAGES, messagesParams],
        queryFn: ({ pageParam }) =>
          getMessages(
            { ...messagesParams, cursor: pageParam, direction: 'up' },
            undefined,
            { Cookie: cookieHeader },
          ),
        initialPageParam: undefined,
      }),
    ]);
  } catch {
    redirect('/auth/sign-in');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className="flex items-center gap-2 border-b px-4 py-3 header-position">
        <Link href="/chats">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ArrowLeft size={14} />
          </Button>
        </Link>
        <span className="text-sm font-medium">{chatName}</span>
      </header>
      <main className="flex-1 overflow-hidden main-position">
        <ChatWindowWidget chatId={chatId} teamIdSSR={teamId} />
      </main>
    </HydrationBoundary>
  );
};

export default ChatPage;
