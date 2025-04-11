import {
  describe,
  expect,
  it,
  beforeEach,
  beforeAll,
  afterAll,
  vi,
} from "vitest";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";
import { prisma } from "@/lib";
import { updateProfile } from "./updateProfile";
import { seedCategories } from "@/server/seeder";
import { deleteTestData } from "@/server/seeder/deleteTestData";
import { getUserIdFromEmail } from "@/server/services/getUserIdFromEmail";
import { ProfileInput } from "@/types/profile";

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

describe("updateProfileでProfilesのレコードが作れるかテスト", () => {
  beforeEach(() => {
    // 認可用にモック
    vi.mocked(getUserIdFromEmail).mockResolvedValue(testUserId);
  });

  it("正常系: プロフィールの作成に成功する", async () => {
    // ダミーデータ
    const subCategoryIds: { id: number }[] = await prisma.subCategory.findMany({
      select: { id: true },
    });

    // サブカテゴリーID配列をシャッフルして先頭5件を選択（重複なし）
    const randomSubCategoryIds: number[] = faker.helpers
      .shuffle(subCategoryIds.map((subCategory) => subCategory.id))
      .slice(0, 5);

    const profileData: ProfileInput = {
      userId: testUserId,
      companyName: faker.company.name(),
      contactName: faker.person.fullName(),
      businessDescription: faker.lorem.paragraphs(3),
      message: faker.lorem.sentence(),
      companyHistory: faker.lorem.paragraphs(2),
      employeeCount: null,
      establishmentYear: 2000,
      capital: 1000000,
      categories: randomSubCategoryIds,
      links: [
        { label: "corporateSite", url: faker.internet.url() },
        { label: "facebook", url: faker.internet.url() },
        { label: "instagram", url: faker.internet.url() },
      ],
    };

    const result = await updateProfile(profileData);
    expect(result.userId).toEqual(testUserId);
  });
});
