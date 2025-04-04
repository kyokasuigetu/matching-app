import { beforeAll, expect, test, afterAll } from "vitest";
import { prisma } from "@/lib";
import { getAllCategories } from "./getAllCategories";
import { seedCategories } from "@/server/seeder/categories";

beforeAll(async () => {
  // categoriesを作成する
  await seedCategories(prisma);
});

test("get all categories.", async () => {
  const result = await getAllCategories(prisma);

  console.log(result);
  expect(result).toEqual(array);
});

// 期待するデータの形式
const array = [
  {
    IT: [
      "ソフトウェア",
      "ハードウェア",
      "ネットワーキング",
      "セキュリティ",
      "クラウド",
    ],
  },
  {
    農業: ["農作業", "畜産", "アグリテック", "有機農法", "灌漑"],
  },
  {
    飲食: ["レストラン", "カフェ", "食品加工", "ケータリング", "飲料"],
  },
  {
    金融: ["銀行業", "投資", "保険", "フィンテック", "会計"],
  },
  {
    小売: ["電子商取引", "実店舗", "卸売", "ファッション", "電子機器"],
  },
];

afterAll(async () => {
  // テスト後にデータベースをクリーンアップする
  await prisma.subCategory.deleteMany();
  await prisma.majorCategory.deleteMany();
});