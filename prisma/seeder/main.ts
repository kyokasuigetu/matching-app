import { PrismaClient } from "@prisma/client";
import { seedCategories } from "../../src/server/seeder/categories";

const prisma = new PrismaClient();

async function main() {
  // categories
  await seedCategories(prisma);

  // profiles
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
