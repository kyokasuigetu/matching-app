import { PrismaClient } from "@prisma/client";
import { seedUsers } from "../../src/server/seeder/users";
import { seedCategories } from "../../src/server/seeder/categories";
import { seedProfiles } from "../../src/server/seeder/profiles";
import { seedChatrooms } from "../../src/server/seeder/chatrooms";

const prisma = new PrismaClient();

async function main() {
  // users
  const users = await seedUsers({ prisma: prisma, userCount: 10 });

  // categories
  await seedCategories(prisma);

  // profiles
  await seedProfiles({
    prisma: prisma,
    users: users,
  });

  // chatrooms
  await seedChatrooms({
    prisma: prisma,
    email: "yuhichinakamura371000@gmail.com",
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
