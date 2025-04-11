import { beforeAll, expect, describe, test, assert, afterAll } from "vitest";
import { prisma } from "@/lib";
import { seedCategories, seedProfiles, seedUsers } from "@/server/seeder";
import { deleteTestData } from "@/server/seeder/deleteTestData";
import { getProfiles } from "./getProfiles";

beforeAll(async () => {
  // categoriesを作成する
  await seedCategories(prisma);

  // profilesを作成する
  await seedProfiles({
    prisma: prisma,
    users: await seedUsers({ prisma: prisma, userCount: 42 }),
  });
});

afterAll(async () => {
  deleteTestData(prisma);
});

describe("getProfiles", () => {
  test("limitもcursorも指定されいない場合にUpdatedAtを基準に最新20+1件をカーソルを取得できること", async () => {
    // テスト用のパラメータ
    const params = {
      limit: null,
      cursor: {
        updatedAt: null,
        userId: null,
      },
      categoryId: null,
    };

    const result = await getProfiles(prisma, params);

    // 取得するのが20件であることを確認
    expect(result.data.length).toBe(20);

    // NextCursorがあることを確認
    expect(result.nextCursor.updatedAt).toBeDefined();
    expect(result.nextCursor.userId).toBeDefined();

    // hasMoreがあることを確認
    expect(result.hasMore).toBe(true);
  });

  test("limitを指定した場合にその件数分取得できること", async () => {
    // テスト用のパラメータ
    const params = {
      limit: 5,
      cursor: {
        updatedAt: null,
        userId: null,
      },
      categoryId: null,
    };

    const result = await getProfiles(prisma, params);

    // 取得するのが5件であることを確認
    expect(result.data.length).toBe(5);

    // NextCursorがあることを確認
    expect(result.nextCursor.updatedAt).toBeDefined();
    expect(result.nextCursor.userId).toBeDefined();

    // hasMoreがあることを確認
    expect(result.hasMore).toBe(true);
  });

  test("カーソル指定によるページネーション（2回目以降のリクエスト）", async () => {
    // 最初のテスト用のパラメータ
    const preParams = {
      limit: null,
      cursor: {
        updatedAt: null,
        userId: null,
      },
      categoryId: null,
    };

    const testData = await getProfiles(prisma, preParams);

    // テスト用のカーソルをセット
    const params = {
      limit: null,
      cursor: {
        updatedAt: testData.nextCursor.updatedAt,
        userId: testData.nextCursor.userId,
      },
      categoryId: null,
    };

    const result = await getProfiles(prisma, params);

    // カーソル以降（古い側）のプロファイルが取得され、最初のページで取得済みのカーソルレコードは含まれない（skip: 1 が適用される）
    assert.notEqual(testData.data[0].userId, result.data[0].userId);
  });

  test("カテゴリフィルタによる検索", async () => {
    // ランダムにSubCategoryを一つ取得
    const subCategory: { id: number } | null =
      await prisma.subCategory.findFirst({
        select: { id: true },
      });

    // 取得したSubCategoryの名前を使用
    const params = {
      limit: null,
      cursor: {
        updatedAt: null,
        userId: null,
      },
      categoryId: subCategory?.id || null,
    };

    const result = await getProfiles(prisma, params);

    // カテゴリフィルタが適用されていることを確認
    result.data.map((profile) => {
      // categoriesに含まれるCategoryのidが、paramsのcategoryと一つだけ一致することを確認
      const categoryIds = profile.categories?.map(category => category.subCategoryId);
      expect(categoryIds).toContain(subCategory?.id);
    });
  });

  test("存在しないカテゴリでフィルタした場合、空の配列が返ること", async () => {
    // 存在しないカテゴリ名を使用
    const params = {
      limit: null,
      cursor: {
        updatedAt: null,
        userId: null,
      },
      categoryId: 999999, // 存在しないID
    };

    const result = await getProfiles(prisma, params);

    // 空の配列が返ることを確認
    expect(result.data.length).toBe(0);
  });
});
