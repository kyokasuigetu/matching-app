import { PrismaClient } from "@prisma/client";

export async function deleteTestData(prisma: PrismaClient): Promise<void> {
  await prisma.$transaction([
    // テスト後にデータベースをクリーンアップする
    prisma.profileCategory.deleteMany(),
    prisma.profileLink.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.chatMessage.deleteMany(),
    prisma.chatRoomParticipant.deleteMany(),
    prisma.chatRoom.deleteMany(),
    prisma.user.deleteMany(),
    prisma.subCategory.deleteMany(),
    prisma.majorCategory.deleteMany(),
  ]);

  // シーケンシャルもリセット
  // await prisma.$executeRaw`ALTER SEQUENCE "majorCategories_id_seq" RESTART WITH 1`;
  // await prisma.$executeRaw`ALTER SEQUENCE "subCategories_id_seq" RESTART WITH 1`;
  // await prisma.$executeRaw`ALTER SEQUENCE "profileCategories_id_seq" RESTART WITH 1`;
  // await prisma.$executeRaw`ALTER SEQUENCE "profileLinks_id_seq" RESTART WITH 1`;
  // await prisma.$executeRaw`ALTER SEQUENCE "chatMessages_id_seq" RESTART WITH 1`;
  // await prisma.$executeRaw`ALTER SEQUENCE "chatRoomParticipants_id_seq" RESTART WITH 1`;
}