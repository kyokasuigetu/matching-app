'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ProfileBackground,
  ProfileAvatar,
  CompanyName,
  Categories,
  ProfileStatus,
  ProfileTextSections,
  Links,
  DMButton
} from "@/components/profile";
import type { OutputProfile } from "@/types";
import { is } from 'date-fns/locale';

export function Profile({
  userId,
  isMyPage = false,
}: {
  userId: string;
  isMyPage?: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<OutputProfile | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null); // 前回のエラーをクリア
        const response = await fetch(`/api/profiles/${userId}`);
        const resData = await response.json();

        // レスポンスのステータスコードに応じて処理を分岐
        if (response.status === 404) {
          return;
        }

        if (response.status === 422) {
          // バリデーションエラーの場合（たとえば userId が無い）
          setError("入力値に誤りがあります。管理者に問い合わせてください。");
          return;
        }

        if (response.status === 401) {
          // 認証エラーまたはセッションに email がないなどの場合
          setError(
            resData.message ||
              "認証エラーが発生しました。再度ログインしてください。"
          );
          return;
        }

        if (!response.ok) {
          // その他のエラー（500など）
          setError("サーバーエラーが発生しました。再度お試しください。");
          return;
        }

        // 正常にデータが取得できた場合
        setProfile(resData.data);
        setIsOwnProfile(resData.isOwnProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("予期せぬエラーが発生しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // ローディング中はスケルトンを表示
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // ”認証ユーザーが/profileで自身のページを見る時”かつ”プロフィールが存在しない場合”は未設定なのでprofiles/[userId]/editへのリンクを用意
  console.log("isMyPage", isMyPage, "isLoading", isLoading);
  if (profile === null && isMyPage) {
    return (
      <div className="text-center space-y-5 py-10">
        <h2>プロフィールが未設定です。</h2>
        <p>プロフィールを作成してください。</p>
        <Link href={`/profiles/${userId}/edit`}>
          <Button>プロフィールを作成する</Button>
        </Link>
      </div>
    );
  }

  // プロフィールが存在しない場合
  if (profile === null) {
    return <div>ユーザーが見つかりませんでした。</div>;
  }

  return <ProfileSheet profile={profile} isOwnProfile={isOwnProfile} />;
}

function ProfileSheet({ profile, isOwnProfile }: { profile: OutputProfile; isOwnProfile: boolean }) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* ヘッダー部分 - 背景色付き */}
      <ProfileBackground data={profile} isOwnProfile={isOwnProfile} />

      {/* プロフィール情報 */}
      <div className="flex flex-col sm:flex-row gap-6 -mt-12 sm:-mt-16">
        {/* アバター */}
        <ProfileAvatar data={profile} />

        {/* 会社情報 */}
        <div className="flex-1 space-y-4">
          <div>
            {/* 社名 + 代表者名 */}
            <CompanyName data={profile} />

            {/* カテゴリ */}
            <Categories data={profile} />
          </div>

          {/* アイコン + ステータスのゾーン */}
          <ProfileStatus data={profile} />

          {/* タイトル + 説明書きのゾーン */}
          <ProfileTextSections data={profile} isSummalized={false} />

          {/* リンク一覧 */}
          <div className="my-10">
            <h2 className="text-lg font-medium mb-2">リンク</h2>
            <Links links={profile.links ? profile.links : []} />
          </div>

          {/* トークルームへ飛ばすボタン */}
          {!isOwnProfile && <DMButton />}
        </div>
      </div>
    </div>
  );
}