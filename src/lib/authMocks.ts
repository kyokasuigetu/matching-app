import { vi } from "vitest";

// next-auth のモックをセットアップ
vi.mock("next-auth", async () => {
  const actual = await vi.importActual("next-auth");
  return {
    __esModule: true,
    ...actual,
    getServerSession: vi.fn(),
  };
});

import { getServerSession } from "next-auth";

// ダミーのセッションやモック初期化用のヘルパー関数
const dummySession = {
  user: {
    name: "Test User",
    email: "test@example.com",
    image: "https://example.com/avatar.png",
  },
  expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
};

export const resetAuthMock = () => {
  (getServerSession as any).mockReset();
};

export const setSuccessfulAuth = () => {
  (getServerSession as any).mockResolvedValue(dummySession);
};

export const setFailedAuth = () => {
  (getServerSession as any).mockResolvedValue(null);
};
