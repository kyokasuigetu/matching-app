import { ChatRoom } from '@/components/chat/index';

export default async function ChatRoomPage(
  { params } :
  { params: Promise<{ matchId: string }> }
) {
  const { matchId } = await params;

  return (
    <div className='w-full'>
      <ChatRoom matchId={matchId} />
    </div>
  );
}
