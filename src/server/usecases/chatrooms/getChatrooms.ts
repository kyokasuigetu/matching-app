import { ChatRoom, PrismaClient } from '@prisma/client';
// import { ChatroomInfo } from "@/types/chatroom";
import { getUserIdFromEmail } from "@/server/services/getUserIdFromEmail";

// 認証ユーザーが参加しているチャットルームの情報を全て取得する
export async function getChatrooms(prisma: PrismaClient)
// : Promise<ChatroomInfo[]>
{
  const authUserId: string | null = await getUserIdFromEmail();

  if (!authUserId) {
    throw new Error("認証ユーザーのIDが取得できませんでした");
  }

  /**
   * クエリがどんなんであるべきか
   *
   * 欲しい情報
   *
   * 1. chatroomId: string;  // チャットルームのID
   * 
   * 2. title: string;
   *  chatroomのtypeによって取得する値が変わる
   *  - directの場合はchatParticipantsの自分じゃない方のparticipantsのId
   *  - groupの時はchatroomのtitleをそのまま使う
   * 
   * 3. lastMessage: string; // 最後のメッセージ
   *  - chatMessagesの中で一番新しいメッセージを取得する
   * 
   * 4. lastMessageAt: Date; // 最後のメッセージの日時
   *  - chatMessagesの中で一番新しいメッセージの日時を取得する
   *
   * 5. unread: boolean; // 未読かどうか
   *  - 自分のchatRoomParticipants.last_read_atが一番新しいメッセージのcreated_atよりも前かどうか
   *  - もしlast_read_atがnullの場合はunreadをtrueにしてUI側ではバッジを表示
   */
  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      // 認証ユーザーが参加しているチャットルームのみ
      participants: {
        some: { userId: authUserId },
      },
    },
    include: {
      participants: {
        include: {
          user: {
            select: {
              name: true,
            },
            include: {
              profile: {
                select: {
                  contactName: true,
                },
              },
            },
          },
        },
      },
      // 最新のメッセージを１件だけ取得（createdAt 降順で上位1件）
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  chatRooms.map((chatroom) => {
    console.log("chatroom", chatroom);
  });

  return chatrooms.map((chatroom) => getChatroomDTO(chatroom));
}

function getChatroomDTO(chatroom: ChatRoom): ChatroomInfo[] {
  const dto: ChatroomInfo = {
    chatroomId: chatroom.id,
    title: "",
    lastMessage: "",
    lastMessageAt: new Date(),
    unread: false,
  }

  if (chatroom.type === "direct") {
    
  }

  return {
    chatroomId: chatroom.id,
    title: "",
    lastMessage: "",
    lastMessageAt: new Date(),
    unread: false,
  };
}

/**
 * select
 *  
 * from
 *  chatrooms
 * join
 *  chatroom_participants
 * on
 *  chatrooms.id = chatroom_participants.chatroom_id
 * join
 *  chatroom_messages
 * on
 *  chatrooms.id = chatroom_messages.chatroom_id
 * (
 *  ここで自分じゃないもう一人の参加者の名前を取得する
 *  参加者の名前はprofilesのcontactName、contactNameがなければusers.nameを取得する
 * )
 * where
 *  chatroom_participants.user_id = [authUserId]
 *  
 */