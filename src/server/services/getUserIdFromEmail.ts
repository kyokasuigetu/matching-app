import { prisma } from "@/lib";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// 認証ユーザーのIDを取得
// ServerActionsのみで使用する想定
export async function getUserIdFromEmail(): Promise<string | null> {
  const session = await getServerSession(authOptions);

  // プロフィールのuserIdと認証ユーザーのuserIdが一致するかどうか
  const email: string | null | undefined = session?.user?.email;

  // 認証済みでないユーザーにはNullを返す。
  if (!email) {
    return null;
  }

  // ユーザーのIDを取得
  const authUser = await prisma.user.findUnique({
    where: { email: email },
    select: { id: true },
  });

  // 一応Nullチェック
  return authUser?.id || null;
}
