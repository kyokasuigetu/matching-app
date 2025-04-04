import { PrismaClient } from "@prisma/client";

export async function seedCategories(prisma: PrismaClient) {
  for (const category of categories) {
    await prisma.majorCategory.create({
      data: category,
    });
  }
}

export const categories = [
  {
    name: "IT",
    subCategories: {
      create: [
        { name: "ソフトウェア" },
        { name: "ハードウェア" },
        { name: "ネットワーキング" },
        { name: "セキュリティ" },
        { name: "クラウド" },
      ],
    },
  },
  {
    name: "農業",
    subCategories: {
      create: [
        { name: "農作業" },
        { name: "畜産" },
        { name: "アグリテック" },
        { name: "有機農法" },
        { name: "灌漑" },
      ],
    },
  },
  {
    name: "飲食",
    subCategories: {
      create: [
        { name: "レストラン" },
        { name: "カフェ" },
        { name: "食品加工" },
        { name: "ケータリング" },
        { name: "飲料" },
      ],
    },
  },
  {
    name: "金融",
    subCategories: {
      create: [
        { name: "銀行業" },
        { name: "投資" },
        { name: "保険" },
        { name: "フィンテック" },
        { name: "会計" },
      ],
    },
  },
  {
    name: "小売",
    subCategories: {
      create: [
        { name: "電子商取引" },
        { name: "実店舗" },
        { name: "卸売" },
        { name: "ファッション" },
        { name: "電子機器" },
      ],
    },
  },
];
