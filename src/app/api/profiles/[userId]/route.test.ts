import {
  describe,
  expect,
  it,
  beforeEach,
  beforeAll,
  afterAll,
} from "vitest";
import { NextRequest } from "next/server";
import { prisma } from "@/lib";
import {
  resetAuthMock,
  setSuccessfulAuth,
  setFailedAuth,
} from "@/lib/authMocks";
import { seedCategories, seedProfiles, seedUsers } from "@/server/seeder";
import { deleteTestData } from "@/server/seeder/deleteTestData";
import { GET } from "./route";
import { User } from "@/types/user";

// テスト用のユーザーIDをグローバルに定義
let testUserId: string;

beforeAll(async () => {
  // テストデータのセットアップ
  await seedCategories(prisma);

  // ユーザーから作成する usersとしているが一人だけ作る
  const users: User[] = await seedUsers({
    prisma: prisma,
    userCount: 1,
  });

  // testUserId をだけ抜いておいて、'ユーザーが存在する'のテストケースで使う
  testUserId = users[0].id;

  await seedProfiles({
    prisma: prisma,
    users: users,
  });

  // 認証のモックをリセット
  resetAuthMock();
  setSuccessfulAuth();
});

afterAll(async () => {
  deleteTestData(prisma);
});

describe("GET /api/profiles/[userId] の認証と入力値バリデーションと404の異常系テスト", () => {
  beforeEach(() => {
    resetAuthMock();
    setSuccessfulAuth();
  });

  it("認証失敗の場合は401", async () => {
    // 認証失敗の場合、getServerSession が null を返すようにする
    setFailedAuth();

    const req = new NextRequest("http://localhost/api/profiles/123");
    const res = await GET(req, { params: { userId: "123" } });
    expect(res.status).toBe(401);
  });

  it('userId が空の場合、422 エラーを返す', async () => {
    // userId が空の場合
    const req = new NextRequest("http://localhost/api/profiles/");
    const res = await GET(req, { params: { userId: "" } });

    expect(res.status).toBe(422);

    const json = await res.json();
    expect(json.message).toBe("Validation Error");
    expect(json.errors).toContainEqual({
      field: "userId",
      error: "userIdは必須です。",
    });
  });

  it('userId が存在しない場合、404 エラーを返す', async () => {
    // 存在しない userId を指定
    const req = new NextRequest("http://localhost/api/profiles/999");
    const res = await GET(req, { params: { userId: "999" } });

    expect(res.status).toBe(404);
    expect((await res.json()).message).toBe("Profile not found");
  });
});

describe("GET /api/profiles/[userId] の正常系テスト", () => {
  beforeEach(() => {
    resetAuthMock();
    setSuccessfulAuth();
  });

  it('ユーザーが存在する' , async () => {
    // testUserId を指定
    const req = new NextRequest("http://localhost/api/profiles/" + testUserId);
    const res = await GET(req, { params: { userId: testUserId } });

    expect(res.status).toBe(200);

    // プロフィールUserIdがtestUserIdと一致することを確認
    expect((await res.json()).data.userId).toBe(testUserId);
  });
});
