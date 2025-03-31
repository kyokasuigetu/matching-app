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
import type { Profile } from "@/types";

export function Profile(profile: { profile: Profile }) {
  // たなおろし
  const data = profile.profile;
  const isOwnProfile = true;

  if (!profile) {
    return <h1>プロフィールが見つかりませんでした。</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* ヘッダー部分 - 背景色付き */}
      <ProfileBackground data={data} isOwnProfile={isOwnProfile} />

      {/* プロフィール情報 */}
      <div className="flex flex-col sm:flex-row gap-6 -mt-12 sm:-mt-16">
        {/* アバター */}
        <ProfileAvatar data={data} />

        {/* 会社情報 */}
        <div className="flex-1 space-y-4">
          <div>
            {/* 社名 + 代表者名 */}
            <CompanyName data={data} />

            {/* カテゴリ */}
            <Categories data={data} />
          </div>

          {/* アイコン + ステータスのゾーン */}
          <ProfileStatus data={data} />

          {/* タイトル + 説明書きのゾーン */}
          <ProfileTextSections data={data} isSummalized={false} />

          {/* リンク一覧 */}
          <div className="my-10">
            <h2 className="text-lg font-medium mb-2">リンク</h2>
            <Links links={data.links ? data.links : []} />
          </div>

          {/* トークルームへ飛ばすボタン */}
          {!isOwnProfile && <DMButton />}
        </div>
      </div>
    </div>
  );
}
