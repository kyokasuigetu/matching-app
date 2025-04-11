import { PrismaClient } from '@prisma/client';
import { Session } from 'next-auth';
import { getProfileDTO, ProfileWithRelations } from './getProfileDTO';
import { OutputProfileWithStatus } from '@/types';
import { NoEmailError } from '@/lib/errors';

type Props = {
  userId:  string;
  session: Session;
  prisma:  PrismaClient;
};

export async function getProfile({
  userId,
  session,
  prisma,
}: Props): Promise<OutputProfileWithStatus | null> {
  const profile: ProfileWithRelations | null = await prisma.profile.findUnique({
    where: { userId },
    include: {
      categories: {
        include: { subCategory: true },
      },
      links: true,
    },
  });

  // Nullチェックする。Nullならプロフィールをまだ作成していないってことなのでそのまま返して、APIで404を返す。
  if (!profile) {
    return null;
  }

  // セッションの認証ユーザーのIDを取得し、当該ユーザーと一致するかどうか判断
  const email: string | null | undefined = session?.user?.email;

  // 万が一、emailが存在しない場合は。
  if (!email) {
    throw new NoEmailError("No email found in session", 401);
  }

  // 認証ユーザーのIDを取得
  const authUser = await prisma.user.findUnique({
    where: { email: email },
  });

  // プロフィールのuserIdと認証ユーザーのuserIdが一致するかどうか
  const isOwnProfile = profile.userId === authUser?.id;

  // 取れた場合は整形して返すのと、認証ユーザーかどうかのフラグをつける
  return {
    data: getProfileDTO(profile),
    isOwnProfile: isOwnProfile,
  };
}