import {
  vi,
  expect,
  describe,
  test,
  beforeEach,
  beforeAll,
  afterAll
} from "vitest";
import { prisma } from "@/lib";
import { seedCategories, seedProfiles, seedUsers, seedChatrooms } from "@/server/seeder";
import { deleteTestData } from "@/server/seeder/deleteTestData";
import { getChatrooms } from "./getChatrooms";
import { getUserIdFromEmail } from "@/server/services/getUserIdFromEmail";

// テスト用のユーザーID
let testUserId: string;

vi.mock("@/server/services/getUserIdFromEmail", () => ({
  getUserIdFromEmail: vi.fn(),
}));

beforeAll(async () => {
  // usersを作成する
  const users = await seedUsers({ prisma: prisma, userCount: 10 })

  // テスト用のユーザーIDに誰か一人分のIDをセット こいつを主人公にしてテストを行う
  testUserId = users[0].id;

  // categoriesを作成する
  await seedCategories(prisma);

  // usersと一緒にprofilesを作成する
  await seedProfiles({
    prisma: prisma,
    users: users,
  });

  // chatroomsを作成する
  await seedChatrooms({
    prisma: prisma,
    users: users,
    targetEmail: users[0].email,
  });
});

afterAll(async () => {
  deleteTestData(prisma);
});

describe("getChatrooms", () => {
  beforeEach(() => {
    // 認可用にモック
    vi.mocked(getUserIdFromEmail).mockResolvedValue(testUserId);
  })

  test("チャットルームの情報を取得できること", async () => {
    // getChatroomsを実行
    const chatrooms = await getChatrooms(prisma);

    // チャットルームの情報が取得できていることを確認
    console.log("chatrooms", chatrooms);
  });
});