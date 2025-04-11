import { Prisma, PrismaClient } from '@prisma/client';
import {
  OutputProfileWithCursor,
  OutputProfile,
} from '@/types';
import { getProfileDTO } from './getProfileDTO';

interface ProfileParams {
  limit: number | null;
  cursor: {
    updatedAt: string | null;
    userId: string | null;
  };
  categoryId: number | null; // subCategoryのID
}

type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    categories: { include: { subCategory: true } };
    links: true;
  };
}>;

export async function getProfiles (prisma: PrismaClient, params: ProfileParams) {
  const limit = params.limit ?? 20; // デフォルトは20件
  const categoryId = params.categoryId ?? null;
  const cursor = params.cursor;

  // クエリを組み立てる
  const queryOptions: Prisma.ProfileFindManyArgs = {
    orderBy: [{ updatedAt: "desc" }, { userId: "desc" }],
    take: limit + 1,
    include: {
      categories: {
        include: { subCategory: true },
      },
      links: true,
    },
  };

  // カテゴリがない時はwhereを空にする
  if (categoryId) {
    queryOptions.where = categoryId 
      ? {
          categories: {
            some: {
              subCategory: {
                id: categoryId,
              },
            },
          },
        }
      : {};
  }

  // カーソルが指定されている場合は、カーソルを追加
  if (cursor.updatedAt && cursor.userId) {
    queryOptions.cursor = {
      updatedAt: new Date(cursor.updatedAt),
      userId: cursor.userId,
    };
  }

  const profiles = (await prisma.profile.findMany(
    queryOptions
  )) as ProfileWithRelations[];

  const result: OutputProfileWithCursor = {
    data: [],
    nextCursor: {
      updatedAt: "",
      userId: "",
    },
    hasMore: false,
  };

  // 取得したプロフィールを整形
  const profileDTOs: OutputProfile[] = profiles.map((profile) => {
    return getProfileDTO(profile);
  });

  // nextCursor と hasMore の設定
  if (profiles.length > limit) {
    // 余分な1件がある場合は、次ページが存在する
    const extraProfile = profiles.pop() as ProfileWithRelations;
    result.nextCursor = {
      updatedAt: extraProfile.updatedAt.toISOString(),
      userId: extraProfile.userId,
    };;
    result.hasMore = true;
  }

  // 取得したプロフィールをresultにセット
  result.data = profileDTOs.slice(0, limit);

  return result;
}
