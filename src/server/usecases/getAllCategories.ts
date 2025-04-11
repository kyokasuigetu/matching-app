import { prisma as client } from "@/lib";
import { PrismaClient } from "@prisma/client";
import type { OutputCategory, OutputSubCategory } from "@/types/category";

export async function getAllCategories(prisma: PrismaClient = client): Promise<OutputCategory> {
  // majorCategory と関連する subCategories を同時に取得
  const majorCategories = await prisma.majorCategory.findMany({
    include: { subCategories: true },
  });

  // reduce を使って1つのオブジェクトにまとめる
  const result: OutputCategory = majorCategories.reduce((acc, category) => {
    acc[category.name] = category.subCategories.map(
      (sub): OutputSubCategory => ({
        id: sub.id,
        name: sub.name,
      })
    );
    return acc;
  }, {} as OutputCategory);

  return result;
}
