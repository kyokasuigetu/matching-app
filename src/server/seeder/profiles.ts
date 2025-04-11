import { PrismaClient, EmployeeCount } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { User } from "@/types/user";

// EmployeeCount のenum値は、Prisma Client上ではキー名で扱われるため、配列で定義しておきます
const employeeCounts: EmployeeCount[] = [
  "ONE_TO_NINE",
  "TEN_TO_TWENTY_NINE",
  "THIRTY_TO_FORTY_NINE",
  "FIFTY_TO_NINETY_NINE",
  "ONE_HUNDRED_TO_199",
  "TWO_HUNDRED_TO_299",
  "THREE_HUNDRED_TO_499",
  "FIVE_HUNDRED_TO_999",
  "ONE_THOUSAND_TO_1999",
  "OVER_2000",
];

type SeedProfilesProps = {
  prisma: PrismaClient;
  users: User[];
}

export async function seedProfiles ({ prisma, users }: SeedProfilesProps): Promise<void> {
  // SubCategoriesが作成されていないとエラーになるため、categories.tsを実行しておく必要があります
  const subCategoryIds: { id: number; }[] = await prisma.subCategory.findMany({
    select: { id: true },
  });

  const flattedSubCategoryIds: number[] = subCategoryIds.map((subCategory) => subCategory.id);

  // 与えられたUserの数だけプロフィールを作成
  users.map( async (user, i) => {
    // サブカテゴリーID配列をシャッフルして先頭5件を選択（重複なし）
    const randomSubCategoryIds: number[] = faker.helpers
      .shuffle(flattedSubCategoryIds)
      .slice(0, 5);

    await prisma.profile.create({
      data: {
        userId: user.id || faker.string.uuid(), // userIdが指定されていない場合はランダムなUUIDを生成
        companyName: faker.person.fullName(),
        contactName: faker.company.name(),
        iconUrl: "/company-image.png",
        backgroundUrl: "/company.png",
        companyHistory: faker.lorem.paragraphs(2),
        businessDescription: faker.lorem.paragraphs(3),
        message: faker.lorem.sentence(),
        employeeCount: faker.helpers.arrayElement(employeeCounts),
        establishmentYear: faker.number.int({ min: 1900, max: 2020 }),
        capital: faker.number.int({ min: 1000000, max: 50000000 }),

        // updatedAtは順番をテストしたいので過去50日で今日まで1日ずつ加算していく。
        updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),

        // 3件のリンクを作成
        links: {
          create: [
            {
              label: "corporateSite",
              link: faker.internet.url(),
            },
            {
              label: "facebook",
              link: faker.internet.url(),
            },
            {
              label: "instagram",
              link: faker.internet.url(),
            },
          ],
        },

        // categoriesとのリレーションを作成
        categories: {
          create: randomSubCategoryIds.map((id) => ({ subCategoryId: id })),
        },
      },
    });
  });
}