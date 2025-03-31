import * as z from "zod";

// 共通の認証スキーマ（メールアドレスとパスワード）
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください。")
    .email({ message: "有効なメールアドレスを入力してください" }),
});

export type emailFormValues = z.infer<typeof emailSchema>;
