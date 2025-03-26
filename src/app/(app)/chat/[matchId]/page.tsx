import { ChatRoom } from '@/components/chat/index';

export default async function ChatRoomPage(
  { params } :
  { params: Promise<{ matchId: string }> }
) {
  const matchId = await params;
  console.log(matchId);

  return (
    <div>
      <ChatRoom matchId={matchId} />
    </div>
  );
}
