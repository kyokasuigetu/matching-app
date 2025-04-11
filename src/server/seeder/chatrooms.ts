import { faker } from "@faker-js/faker";
import { ChatRoom, PrismaClient } from "@prisma/client";
import { User } from "@/types/user";
import { randomInt } from "crypto";

export async function seedChatrooms({
  prisma,
  users,
  targetEmail
}: {
  prisma: PrismaClient;
  users: User[];
  targetEmail: string;
}): Promise<void> {
  // ①「私」のユーザー情報
  const myUserId: { id: string } | null = await prisma.user.findFirst({
    where: {
      email: targetEmail,
    },
    select: {
      id: true,
    },
  });

  // ユーザーが見つからない場合は処理を終了
  if (!myUserId) {
    console.log(`メールアドレス: ${targetEmail} を持つユーザーが見つかりません。テストデータの作成を終了します。`);
    return;
  }

  const myId: string = myUserId.id;

  // 現在時刻を取得
  const now = new Date();

  for (const user of users) {
    // 相手ユーザーのIDは使い回すので取っておく
    const opponentUserId: string = user.id;

    // ③ ChatRoom作成（DM部屋で作る。titleは不要）
    const chatRoom: ChatRoom = await prisma.chatRoom.create({
      data: {
        type: "direct",
      },
    });

    // ④ チャットルームの参加者を2人分作成する
    // ここでは、一度に複数のレコードを作成する createMany を利用
    await prisma.chatRoomParticipant.createMany({
      data: [
        {
          roomId: chatRoom.id,
          userId: myId,
          joinedAt: now,
          lastReadAt: now,
        },
        {
          roomId: chatRoom.id,
          userId: opponentUserId,
          joinedAt: now,
          lastReadAt: now,
        },
      ],
    });

    // ⑤ 自分のメッセージを作成
    await prisma.chatMessage.createMany({
      data: createMessageData({
        userId: myId,
        chatRoomId: chatRoom.id,
        count: randomInt(15), // 作成するメッセージの数
      }),
    });

    // ⑥ 相手のメッセージを作成
    await prisma.chatMessage.createMany({
      data: createMessageData({
        userId: opponentUserId,
        chatRoomId: chatRoom.id,
        count: randomInt(15), // 作成するメッセージの数
      }),
    });
  }
}

function createMessageData({
  userId,
  chatRoomId,
  count = 10,
}: {
  userId: string;
  chatRoomId: string;
  count?: number; // 作成するメッセージの数
}) {
  const messages = [];

  for (let i = 0; i < count; i++) {
    messages.push({
      roomId: chatRoomId,
      authorId: userId,
      content: faker.lorem.sentence(), // ランダムな文章を生成
      type: "text", // メッセージ種別。必要に応じて画像やファイルなどに変更可能
    });
  }

  return messages;
}
