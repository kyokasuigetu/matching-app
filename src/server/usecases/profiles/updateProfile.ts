import { getUserIdFromEmail } from "@/server/services/getUserIdFromEmail";
import { prisma } from "@/lib";
import { ServerError, ForbiddenError } from "@/lib/errors";
import { ProfileInput } from "@/types/profile";

export async function updateProfile(profileData: ProfileInput) {
  // 認可チェック: 提出された userId と認証ユーザーのIDが一致するか確認
  const authUserId: string | null = await getUserIdFromEmail();

  if (profileData.userId !== authUserId) {
    throw new ForbiddenError();
  }

  try {
    const updatedProfile = await prisma.$transaction(async (tx) => {
      // プロフィールの upsert
      const profile = await tx.profile.upsert({
        where: { userId: profileData.userId },
        update: {
          companyName: profileData.companyName,
          contactName: profileData.contactName,
          companyHistory: profileData.companyHistory,
          businessDescription: profileData.businessDescription,
          message: profileData.message,
          employeeCount: profileData.employeeCount || undefined,
          establishmentYear: profileData.foundedYear || undefined,
          capital: profileData.capital || undefined,
        },
        create: {
          userId: profileData.userId,
          companyName: profileData.companyName,
          contactName: profileData.contactName,
          companyHistory: profileData.companyHistory,
          businessDescription: profileData.businessDescription,
          message: profileData.message,
          employeeCount:
            profileData.employeeCount !== null
              ? profileData.employeeCount
              : undefined,
          establishmentYear: profileData.foundedYear || undefined,
          capital: profileData.capital || undefined,
        },
      });

      // ProfileLink の更新
      // 既存のリンクを削除
      await tx.profileLink.deleteMany({
        where: { profileId: profileData.userId },
      });

      // 新しいリンクが存在する場合は、createMany を実行
      if (profileData.links && profileData.links.length > 0) {
        const linksData = profileData.links.map((link) => ({
          profileId: profileData.userId,
          label: link.label,
          link: link.url,
        }));
        await tx.profileLink.createMany({
          data: linksData,
        });
      }

      // ProfileCategory の更新
      // 既存のカテゴリ関連情報を削除
      await tx.profileCategory.deleteMany({
        where: { userId: profileData.userId },
      });

      // 新しいカテゴリが存在する場合は、createMany を実行
      if (profileData.categories && profileData.categories.length > 0) {
        const categoryData = profileData.categories.map((subCategoryId) => ({
          userId: profileData.userId,
          subCategoryId,
        }));
        await tx.profileCategory.createMany({
          data: categoryData,
        });
      }

      return profile;
    });

    return updatedProfile;

  } catch (error) {
    console.error("Error updating profile:", error);
    throw new ServerError("プロフィールの更新に失敗しました。");
  }
}
