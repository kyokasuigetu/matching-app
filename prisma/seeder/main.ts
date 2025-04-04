import { PrismaClient } from "@prisma/client";
import { categories } from "./categories";

const prisma = new PrismaClient();

async function main() {
  // categories
  for (const category of categories) {
    await prisma.majorCategory.create({
      data: category,
    });
  }

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
