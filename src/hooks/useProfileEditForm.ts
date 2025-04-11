'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormValues } from "@/schemas/profileSchema";
import type { OutputProfileWithStatus, OutputProfile } from "@/types";

export function useProfileEditForm({ authUserId }: { authUserId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);

      try {
        // 更新前の値をセットするために取得
        const res = await fetch(`/api/profiles/${authUserId}`);

        // 初回作成後まではProfileはないので、データがないこと自体は問題ではない。
        // Q. たまたまauthUserIdでProfileを見つけられずに404が出た場合は？　前の値が出ないのは不便では?
        // A. レアケースだと思うが、認可でひっかけるので問題ない。
        // Q. Profileがある場合に404が出て、一つのUserIdで二人分のProfileを作成できてしまうことはないか？
        // A. 認証ユーザー以外のUserIdでは作成できないように認可を行うので、他人が作成することは防げる。
        // A. なしすまして入る場合は別の問題。OAuthとMagicLinkなら基本的に大丈夫なんではないか。
        if (res.status === 404) {
          return;
        }

        if (!res.ok) {
          setError("プロフィールの取得に失敗しました。");
          return;
        }

        const json: OutputProfileWithStatus = await res.json();
        const profile: OutputProfile | null = json.data;

        // ここで取得した値をセットする 参考: https://zenn.dev/kena/articles/ba26b3245c599a
        form.reset(setValues(authUserId, profile));

      } catch (error) {
        console.error("Error fetching profile:", error);

      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [authUserId, form]);

  async function onSubmit(values: ProfileFormValues) {
    setIsSubmitting(true);

    // POSTする
    const res = await postProfile(values);

    // 成功時はマイページへリダイレクト
    if (res.status === 201) {
      // todo(2025/4/11): 本当はflashを出したい。
      alert("プロフィールを更新しました。");
      setIsSubmitting(false);
      router.push("/profiles");
    }

    // todo(2025/4/11): 401, 403, 422, 500が返って来得る。
    if (res.status !== 201) {
      alert("エラーが発生しました。");
    }

    setIsSubmitting(false);
  }

  return {
    form,
    isLoading,
    isSubmitting,
    error,
    onSubmit,
  };
}

async function postProfile(values: ProfileFormValues): Promise<Response> {
  const res = await fetch("/api/profiles", {
    method: "POST",
    body: JSON.stringify(values),
  });

  return res;
}

function setValues(authUserId: string, profile: OutputProfile | null): ProfileFormValues {
  return {
    // ユーザーID（必須）　認可に使う　サーバーサイドで再度認証ユーザーのIDと照合して認可を行う
    userId: authUserId,

    // 入力があれば文字列、空なら null として扱う
    companyName: profile?.companyName ?? "",

    // 代表者名も同様
    contactName: profile?.contactName ?? "",

    // 沿革（最大1000文字）
    companyHistory: profile?.companyHistory ?? "",

    // 事業説明
    businessDescription: profile?.businessDescription ?? "",

    // メッセージ
    message: profile?.message ?? "",

    // 従業員数（列挙型で定義）
    employeeCount: profile?.employeeCount ?? "ONE_TO_NINE",

    // 設立（整数としてチェック）
    establishmentYear: profile?.establishmentYear ?? 2000,

    // 資本金
    capital: profile?.capital ?? 1000000,

    // カテゴリの配列（存在する場合は subCategoryId のみ）
    categories:
      profile?.categories && profile.categories.length > 0
        ? // OutputCategory[]をsubCategoryIdだけのnumber[]に変換する
          profile.categories.map((category) => category.subCategoryId)
        : [],

    // リンクの配列（存在する場合は linkSchema でチェック）
    links: profile?.links ?? [],
  }
}