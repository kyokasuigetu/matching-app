import { z } from "zod";

export const EmployeeCountEnum = z.enum([
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
]);

export type EmployeeCount = z.infer<typeof EmployeeCountEnum>;

export const linkSchema = z.object({
  label: z.enum([
    "corporateSite",
    "facebook",
    "x",
    "instagram",
    "youTube",
    "linkedIn",
    "others",
  ]),
  url: z.string().url({ message: "有効なURLを入力してください。" }),
});

export const profileSchema = z.object({
  // ユーザーID（必須）　認可に使う　サーバーサイドで再度認証ユーザーのIDと照合して認可を行う
  userId: z.string(),

  // 入力があれば文字列、空なら null として扱う
  companyName: z.string().nullable(),

  // 代表者名も同様
  contactName: z.string().nullable(),

  // // アイコン画像URL（入力があればURLとしてチェック）
  // iconUrl: z
  //   .string()
  //   .url({ message: "有効なURLを入力してください。" })
  //   .nullable(),

  // // 背景画像URL
  // backgroundUrl: z
  //   .string()
  //   .url({ message: "有効なURLを入力してください。" })
  //   .nullable(),

  // 事業説明
  businessDescription: z.string().nullable(),

  // メッセージ
  message: z.string().nullable(),

  // 沿革（最大1000文字）
  companyHistory: z
    .string()
    .max(1000, { message: "沿革は最大1000文字までです。" })
    .nullable(),

  // 従業員数（列挙型で定義）
  employeeCount: EmployeeCountEnum.nullable(),

  // 設立（整数としてチェック）
  establishmentYear: z.number().int().nullable(),

  // 資本金
  capital: z.number().int().nullable(),

  // カテゴリの配列（存在する場合は subCategoryId のみ）
  categories: z.array(z.number()).nullable(),

  // リンクの配列（存在する場合は linkSchema でチェック）
  links: z.array(linkSchema).nullable(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
