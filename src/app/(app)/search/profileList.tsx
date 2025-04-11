'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Categories,
  ProfileTextSections,
  DMButton,
} from "@/components/profile";
import type { OutputProfile } from '@/types';

export function ProfileList () {
  const [profiles, setProfiles] = useState<OutputProfile[]>([]);
  // const [limit, setLimit] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useSearchParams で現在の検索パラメータを取得
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  // category が変化したときにログ出力
  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);

      // todo(2025/4/10): エラーハンドリング
      const apiUrl = categoryId !== null
          ? `/api/profiles?categoryId=${categoryId}`
          : `/api/profiles`;

      const res = await fetch(apiUrl);
      const json = await res.json();
      setProfiles(json.data);

      setIsLoading(false);
    }

    fetchProfiles();
  }, [categoryId]);

  return (
    <div className="grid gird-clos-1 lg:grid-cols-2 gap-5 p-5">
      {
        // ローディング中はスケルトンを表示
        isLoading ? (
          <div className="flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : (
            // プロフィールが取得できたら表示
            profiles.length === 0 ? (
              <div className="flex justify-center items-center">
                <p>プロフィールが見つかりませんでした。</p>
              </div>
          ) : (
            profiles.map((profile: OutputProfile, index: number) => (
              <ProfileCard key={index} profile={profile} />
            ))
          )
        )
      }
    </div>
  );
}

function ProfileCard({ profile }: { profile: OutputProfile }) {
  const data = profile;

  return (
    <Card className="col-span-1 w-full overflow-hidden">
      <CardHeader className="px-2 py-0">
        {/* アバター */}
        <div className="flex justify-around items-center gap-3">
          {/* 画像 */}
          <Avatar className="h-16 w-16 sm:h-24 sm:w-24 border-2 border-white bg-white">
            <AvatarImage
              src={data.iconUrl || "company-image.png"}
              alt={data.companyName || "avatar-image"}
            />
            <AvatarFallback>{data.companyName}</AvatarFallback>
          </Avatar>

          {/* 会社名と担当者名 */}
          <div>
            <h1 className="p-3 font-bold text-right">
              {data.companyName}
              <span className="block text-sm font-medium mt-2">
                {data.contactName}
              </span>
            </h1>
          </div>
        </div>
      </CardHeader>

      {/* プロフィール情報 */}
      <CardContent className="pt-0">
        {/* 会社情報 */}
        <div className="flex flex-col gap-5">
          {/* カテゴリ */}
          <Categories data={data} />

          {/* アイコン + ステータスのゾーン */}
          {/* <ProfileStatus data={data} /> */}

          {/* タイトル + 説明書きのゾーン */}
          <ProfileTextSections data={data} isSummalized={true} />

          {/* リンク一覧 */}
          {/* <div>
            <h2 className="text-lg font-medium mb-2">リンク</h2>
            <Links links={data.links ? data.links : []} />
          </div> */}

          {/* トークルームへ飛ばすボタン */}
          <div className="grid grid-cols-2 gap-3">
            <DetailButton accountId={profile.userId} />
            <DMButton />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailButton ({ accountId }: { accountId: string }) {
  if (accountId) {
    return (
      <Link
        href={`/profiles/${accountId}`}
        className='w-full bg-gray-400 rounded-4xl text-white font-bold text-center py-2'
      >
        詳細を見る
      </Link>
    );
  }

  return (
    <div>
    </div>
  );
}