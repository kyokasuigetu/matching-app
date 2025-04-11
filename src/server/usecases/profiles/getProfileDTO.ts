import { Profile, ProfileCategory, SubCategory, ProfileLink } from '@prisma/client';
import { OutputProfile, OutputCategory, OutputLink } from "@/types";

export type ProfileWithRelations = Profile & {
  categories: (ProfileCategory & {
    subCategory: SubCategory;
  })[];
  links: ProfileLink[];
};

// 取得したプロフィールを整形
export function getProfileDTO(profile: ProfileWithRelations): OutputProfile {
  // categoriesを整形
  const categories: OutputCategory[] = profile.categories.map(
    (category) => {
      const outputCategory: OutputCategory = {
        subCategoryId: category.subCategoryId,
        name: category.subCategory.name, // ここでsubCategoryのnameプロパティを取得
        majorCategoryId: category.subCategory.majorCategoryId, // subCategory内のmajorCategoryIdを使用
      };
      return outputCategory;
    }
  );

  // linksを整形
  const links: OutputLink[] = profile.links.map((link) => {
    return {
      label: link.label,
      url: link.link,
    };
  });

  return {
    userId: profile.userId,
    companyName: profile.companyName || null,
    contactName: profile.contactName || null,
    iconUrl: profile.iconUrl || null,
    backgroundUrl: profile.backgroundUrl || null,
    companyHistory: profile.companyHistory || null,
    businessDescription: profile.businessDescription || null,
    message: profile.message || null,
    employeeCount: profile.employeeCount || null,
    establishmentYear: profile.establishmentYear || null,
    capital: profile.capital || null,
    updatedAt: profile.updatedAt || null,
    categories: categories || [],
    links: links || [],
  };
}