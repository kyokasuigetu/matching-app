import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function seedUsers({
  prisma,
  userCount = 10,
}: {
  prisma: PrismaClient;
  userCount?: number;
}): Promise<User[]> {
  // ユーザーのデータを作成
  const userData = createUserData(userCount);

  // userCount件のユーザーを作成
  await prisma.user.createMany({
    data: userData,
    skipDuplicates: true,
  });

  // 作成したユーザーを取得
  const users: User[] = await prisma.user.findMany({
    where: {
      email: {
        in: userData.map((u) => u.email),
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return users;
}

function createUserData(count: number = 10): { name: string; email: string }[] {
  const userData = [];

  for (let i = 0; i < count; i++) {
    userData.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
  }

  return userData;
}