import { cookies } from 'next/headers';
import { redirect, unstable_rethrow } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
// eslint-disable-next-line no-restricted-imports
import { getUserSession } from 'entities/auth/api/server';
import { getChat, getMessages, IGetMessagesParams } from 'entities/chat';

import { ChatWindowWidget } from 'widgets';
import { ChatHeader } from 'features/chats';
import { QueryKeys } from 'shared/constants';
import { makeQueryClient } from 'shared/lib';

interface Props {
  params: Promise<{ chatId: string }>;
}

const MESSAGES_LIMIT = 15;

const ChatPage = async ({ params }: Props) => {
  const { chatId } = await params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const queryClient = makeQueryClient();

  let teamId: string;
  let chatName: string;

  try {
    const userSession = await getUserSession();

    if (!userSession.selectedTeamId) {
      redirect('/chats');
    }

    teamId = userSession.selectedTeamId;

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
  } catch (error) {
    unstable_rethrow(error);
    redirect('/auth/sign-in');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatHeader teamId={teamId} chatId={chatId} initialName={chatName} />
      <main className="flex-1 overflow-hidden main-position">
        <ChatWindowWidget chatId={chatId} teamIdSSR={teamId} />
      </main>
    </HydrationBoundary>
  );
};

export default ChatPage;
