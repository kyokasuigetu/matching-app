import { EmployeeCount } from "@prisma/client";

export interface Profile {
  user_id:             string;
  companyName:         string | null;
  representativeName:  string | null;
  icon:                string | null;   // アイコン画像URL
  background:          string | null;   // 背景画像URL
  industry:            string[] | null; // 事業カテゴリ（最大5個程度）
  businessDescription: string | null;   // 事業説明（LLMが読み込みやすい文章を推奨）
  message:             string | null;   // メッセージ（LLMが読み込みやすい文章を推奨）
  history:             string | null;   // 沿革（最大1000文字程度の可変長テキスト）
  employeeCount:       EmployeeCount | null; // 従業員数（区分）
  foundedYear:         number | null;   // 設立（西暦の数字）
  capital:             number | null;   // 資本金（数字、例: 50000000 なら5,000万円）
  location:            string | null;   // 所在地
  links: Link[] | null; // リンク（なんでもOK）
}

export type Link = {
  label: LinkLabel; // リンクの種類（例:"ホームページ", "Facebook"）
  url: string;
};

export type LinkLabel =
  | "corporateSite"
  | "facebook"
  | "x"
  | "instagram"
  | "youTube"
  | "linkedIn"
  | "others";

export type Category = {
  [key: string]: string[];
};

export interface OutputProfileWithCursor {
  data: OutputProfile[];
  nextCursor: {
    updatedAt: string;
    userId: string;
  };
  hasMore: boolean;
}

export interface OutputProfileWithStatus {
  data: OutputProfile;
  isOwnProfile: boolean;
}

export interface OutputProfile {
  userId: string;
  companyName: string | null;
  contactName: string | null;
  iconUrl: string | null;
  backgroundUrl: string | null;
  companyHistory: string | null;
  businessDescription: string | null;
  message: string | null;
  employeeCount: EmployeeCount | null;
  establishmentYear: number | null;
  capital: number | null;
  updatedAt: Date | null;
  categories: OutputCategory[] | null;
  links: OutputLink[] | null;
}

export type OutputCategory = {
  subCategoryId: number;
  name: string;
  majorCategoryId: number;
};

export type OutputLink = {
  label: LinkLabel;
  url: string;
};

export interface ProfileParams {
  limit: number | null;
  cursor: {
    updatedAt: string | null;
    userId: string | null;
  };
  categoryId: number | null;
}

export interface ProfileInput {
  userId: string; // 必須　認可に使う
  companyName: string | null;
  contactName: string | null;
  businessDescription: string | null; // 事業説明（LLMが読み込みやすい文章を推奨）
  message: string | null; // メッセージ（LLMが読み込みやすい文章を推奨）
  companyHistory: string | null; // 沿革（最大1000文字程度の可変長テキスト）
  employeeCount: EmployeeCount | null; // 従業員数（区分）
  establishmentYear: number | null; // 設立（西暦の数字）
  capital: number | null; // 資本金（数字、例: 50000000 なら5,000万円）

  categories: number[] | []; // subCategoryId(number)の配列。最大5つ。
  links: Link[] | null; // リンク プロパティに分類とURIがあるオブジェクトの配列。
}

export type ProfileEditFormFieldProps = {
  form: UseFormReturn<ProfileFormValues>;
};