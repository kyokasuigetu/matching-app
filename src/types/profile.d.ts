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

export type EmployeeCount =
  | "1～9人"
  | "10～29人"
  | "30～49人"
  | "50～99人"
  | "100～199人"
  | "200～299人"
  | "300～499人"
  | "500～999人"
  | "1000～1999人"
  | "2000人以上";

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
