import { prisma as client } from "@/lib";
import { PrismaClient } from "@prisma/client";

export async function getAllCategories(prisma: PrismaClient = client) {
  // majorCategory と関連する subCategories を同時に取得
  const majorCategories = await prisma.majorCategory.findMany({
    include: { subCategories: true },
  });

  // 取得したデータを、[ { majorCategoryName: [ subCategoryName, ... ] }, ... ] の形に変換する
  const result = majorCategories.map((category) => ({
    [category.name]: category.subCategories.map((sub) => sub.name),
  }));

  return result;
}
