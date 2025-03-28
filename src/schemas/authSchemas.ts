import * as z from "zod";

// 共通の認証スキーマ（メールアドレスとパスワード）
export const authSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上必要です" }),
});

// ログイン用スキーマは共通のauthSchemaと同じ内容とする
export const loginSchema = authSchema;

export type LoginFormValues = z.infer<typeof loginSchema>;

// 登録用スキーマはauthSchemaを拡張し、会社名と担当者名を追加
export const registerSchema = authSchema.extend({
  companyName: z
    .string()
    .min(1, { message: "会社名を入力してください" }),
  personalName: z
    .string()
    .min(1, { message: "担当者名を入力してください" }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;