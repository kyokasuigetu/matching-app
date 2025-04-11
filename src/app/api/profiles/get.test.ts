import {
  describe,
  expect,
  it,
  assert,
  beforeEach,
  beforeAll,
  afterAll
} from "vitest";
import { NextRequest } from "next/server";
import { prisma } from "@/lib";
import { resetAuthMock, setSuccessfulAuth, setFailedAuth } from "@/lib/authMocks";
import { seedCategories, seedProfiles, seedUsers } from "@/server/seeder";
import { deleteTestData } from "@/server/seeder/deleteTestData";
import { GET } from "./route";
import { OutputProfile } from "@/types";

beforeAll(async () => {
  // テストデータのセットアップ
  await seedCategories(prisma);
  await seedProfiles({
    prisma: prisma,
    users: await seedUsers({ prisma: prisma, userCount: 200 })
  });
});

afterAll(async () => {
  deleteTestData(prisma);
});

describe("GET /api/profiles の認証と入力値バリデーションの異常系テスト", () => {
  beforeEach(() => {
    resetAuthMock();
    setSuccessfulAuth();
  });

  it("認証失敗の場合は401", async () => {
    // 認証失敗の場合、getServerSession が null を返すようにする
    setFailedAuth();

    const req = new NextRequest("http://localhost/api/profiles?limit=20");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("limit が負の数の場合、422 エラーを返す", async () => {
    const req = new NextRequest("http://localhost/api/profiles?limit=-5", {
      headers: { Authorization: "Bearer valid" },
    });
    const res = await GET(req);
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.message).toBe("Validation Error");
    expect(json.errors).toContainEqual({
      field: "limit",
      error: "limitは自然数である必要があります。",
    });
  });

  // limit が 0 の場合（自然数としては不正）
  it("limit が 0 の場合、422 エラーを返す", async () => {
    const req = new NextRequest("http://localhost/api/profiles?limit=0", {
      headers: { Authorization: "Bearer valid" },
    });
    const res = await GET(req);
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.message).toBe("Validation Error");
    expect(json.errors).toContainEqual({
      field: "limit",
      error: "limitは自然数である必要があります。",
    });
  });

  // cursor パラメータが部分的に指定された場合（cursorUpdatedAt のみ）
  it("cursorUpdatedAt のみ指定された場合、422 エラーを返す", async () => {
    const req = new NextRequest(
      "http://localhost/api/profiles?cursorUpdatedAt=2025-04-07T00:00:00Z",
      { headers: { Authorization: "Bearer valid" } }
    );
    const res = await GET(req);
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.message).toBe("Validation Error");
    expect(json.errors).toContainEqual({
      field: "cursor",
      error: "cursorのupdatedAtとuserIdは両方必要です。",
    });
  });

  it("cursorUserId のみ指定された場合、422 エラーを返す", async () => {
    const req = new NextRequest(
      "http://localhost/api/profiles?cursorUserId=test-user",
      { headers: { Authorization: "Bearer valid" } }
    );
    const res = await GET(req);
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.message).toBe("Validation Error");
    expect(json.errors).toContainEqual({
      field: "cursor",
      error: "cursorのupdatedAtとuserIdは両方必要です。",
    });
  });

  it("cursor.updatedAt に不正な日付文字列が指定された場合、422 エラーを返す", async () => {
    const req = new NextRequest(
      "http://localhost/api/profiles?cursorUpdatedAt=invalid-date&cursorUserId=test-user",
      { headers: { Authorization: "Bearer valid" } }
    );
    const res = await GET(req);
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.message).toBe("Validation Error");
    expect(json.errors).toContainEqual({
      field: "cursor",
      error: "cursor.updatedAtは有効な日付文字列である必要があります。",
    });
  });
});

describe("GET /api/profiles の正常系テスト", () => {
  beforeEach(() => {
    resetAuthMock();
    setSuccessfulAuth();
  });

  it('limit と cursor が指定されていない場合、最新の 20 件を取得できる', async () => {
    const req = new NextRequest("http://localhost/api/profiles", {
      headers: { Authorization: "Bearer valid" },
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.data.length).toBe(20);
    expect(json.hasMore).toBe(true);
    expect(json.nextCursor).toHaveProperty("updatedAt");
    expect(json.nextCursor).toHaveProperty("userId");
  });

  it("limitを指定した場合にその件数分取得できること", async () => {
    // なんとなく10としてテスト
    const limitCount = 10;

    const req = new NextRequest(`http://localhost/api/profiles?limit=${limitCount}`, {
      headers: { Authorization: "Bearer valid" },
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.data.length).toBe(limitCount);
    expect(json.hasMore).toBe(true);
    expect(json.nextCursor).toHaveProperty("updatedAt");
    expect(json.nextCursor).toHaveProperty("userId");
  });

  it("カーソル指定によるページネーション（2回目以降のリクエスト）", async () => {
    // なんとなく10としてテスト
    const limitCount = 2;

    // 最初のリクエスト
    const firstReq = new NextRequest(
      `http://localhost/api/profiles?limit=${limitCount}`,
      {
        headers: { Authorization: "Bearer valid" },
      }
    );
    const firstRes = await GET(firstReq);
    const testData = await firstRes.json();

    // カーソルを取得し、2回目のリクエストを作成
    const cursor = testData.nextCursor;
    const req = new NextRequest(
      `http://localhost/api/profiles?limit=${limitCount}&cursorUpdatedAt=${cursor.updatedAt}&cursorUserId=${cursor.userId}`,
      {
        headers: { Authorization: "Bearer valid" },
      }
    );
    const res = await GET(req);
    const result = await res.json();

    // カーソル以降（古い側）のプロファイルが取得され、最初のページで取得済みのカーソルレコードは含まれない（skip: 1 が適用される）
    assert.notEqual(testData.data[0].userId, result.data[0].userId);
    expect(result.data.length).toBe(limitCount);
    expect(result.hasMore).toBe(true);
    expect(result.nextCursor).toHaveProperty("updatedAt");
    expect(result.nextCursor).toHaveProperty("userId");
  });

  it("categoryIdを指定した場合に、そのカテゴリに属するプロフィールが取得できること", async () => {
    // ランダムにSubCategoryを一つ取得
    const subCategory: { id: number } | null =
      await prisma.subCategory.findFirst({
        select: { id: true },
      });

    const req = new NextRequest(
      `http://localhost/api/profiles?categoryId=${subCategory?.id}`,
      {
        headers: { Authorization: "Bearer valid" },
      }
    );
    const res = await GET(req);
    expect(res.status).toBe(200);
    const json = await res.json();

    // カテゴリフィルタが適用されていることを確認
    json.data.map((profile: OutputProfile) => {
      // categoriesに含まれるCategoryのidが、paramsのcategoryと一つだけ一致することを確認
      const categoryIds = profile.categories?.map((category) => category.subCategoryId);
      expect(categoryIds).toContain(subCategory?.id);
    });
  });

  it("存在しないカテゴリでフィルタした場合、空の配列が返ること", async () => {
    // 存在しないカテゴリ名を指定
    const nonExistentCategoryId = 999999;

    const req = new NextRequest(
      `http://localhost/api/profiles?categoryId=${nonExistentCategoryId}`,
      {
        headers: { Authorization: "Bearer valid" },
      }
    );
    const res = await GET(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.data).toEqual([]);
  });
});
