import {
  describe,
  expect,
  it,
  beforeEach,
  beforeAll,
  afterAll,
  vi
} from "vitest";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";
import { NextRequest } from "next/server";
import { prisma } from "@/lib";
import {
  resetAuthMock,
  setSuccessfulAuth,
  setFailedAuth,
} from "@/lib/authMocks";
import { seedCategories } from "@/server/seeder";
import { deleteTestData } from "@/server/seeder/deleteTestData";
import { getUserIdFromEmail } from "@/server/services/getUserIdFromEmail";
import { POST } from "./route";
import { constants } from "@/lib/constants";

// テスト用のuuid
const testUserId: string = v4();

vi.mock("@/server/services/getUserIdFromEmail", () => ({
  getUserIdFromEmail: vi.fn(),
}));

beforeAll(async () => {
  // テストデータのセットアップ
  await seedCategories(prisma);
});

afterAll(async () => {
  deleteTestData(prisma);
});

describe("POST /api/profiles の認証と入力値バリデーションの異常系テスト", () => {
  beforeEach(() => {
    resetAuthMock();
    setSuccessfulAuth();
  });

  it("認証失敗の場合は401", async () => {
    // 認証失敗の場合、getServerSession が null を返すようにする
    setFailedAuth();

    const req = new NextRequest("http://localhost/api/profiles", {
      method: "POST",
      headers: { Authorization: "Bearer valid" },
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });
});

describe("POST /api/profiles の正常系テスト", () => {
  beforeEach(() => {
    resetAuthMock();
    setSuccessfulAuth();

    // 認可用にモック
    vi.mocked(getUserIdFromEmail).mockResolvedValue(testUserId);
  });

  it("正常系: プロフィールの作成に成功する", async () => {
    // ダミーデータ
    const subCategoryIds: { id: number }[] = await prisma.subCategory.findMany({
      select: { id: true }
    });

    // サブカテゴリーID配列をシャッフルして先頭5件を選択（重複なし）
    const randomSubCategoryIds: number[] = faker.helpers
      .shuffle(subCategoryIds.map((subCategory) => subCategory.id))
      .slice(0, 5);

    const requestBody = {
      userId: testUserId,
      companyName: faker.company.name(),
      contactName: faker.person.fullName(),
      businessDescription: faker.lorem.paragraphs(3),
      message: faker.lorem.sentence(),
      employeeCount: faker.helpers.arrayElement(constants.employeeCount),
      establishmentYear: 2000,
      capital: 1000000,
      categories: randomSubCategoryIds,
      links: [
        { label: "corporateSite", url: faker.internet.url() },
        { label: "facebook", url: faker.internet.url() },
        { label: "instagram", url: faker.internet.url() },
      ],
    };

    // リクエストを送信
    const req = new NextRequest("http://localhost/api/profiles", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer valid",
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(201);

    const json = await res.json();
    expect(json.userId).toBe(testUserId);
  });
});