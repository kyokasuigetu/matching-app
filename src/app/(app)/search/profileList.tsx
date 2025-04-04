import Link from 'next/link';
import { getAccount } from '@/lib/mocks';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Categories,
  ProfileTextSections,
  DMButton,
} from "@/components/profile";
import type { Profile } from '@/types';


export function ProfileList () {
  const profile: Profile = getAccount("search123");

  return (
    <div className='grid gird-clos-1 lg:grid-cols-2 gap-5 p-5'>
      <ProfileCard profile={profile} />
      <ProfileCard profile={profile} />
      <ProfileCard profile={profile} />
      <ProfileCard profile={profile} />
      <ProfileCard profile={profile} />
    </div>
  );
}

function ProfileCard ({ profile }: { profile: Profile }) {
  const data = profile;

  return (
    <Card className="col-span-1 w-full overflow-hidden">
      <CardHeader className='px-2 py-0'>
        {/* アバター */}
        <div className="flex justify-around items-center gap-3">
          {/* 画像 */}
          <Avatar className="h-16 w-16 sm:h-24 sm:w-24 border-2 border-white bg-white">
            <AvatarImage
              src={data.icon || "company-image.png"}
              alt={data.companyName || "avatar-image"}
            />
            <AvatarFallback>{data.companyName}</AvatarFallback>
          </Avatar>

          {/* 会社名と担当者名 */}
          <div>
            <h1 className="p-3 font-bold text-right">
              {data.companyName}
              <span className="block text-sm font-medium mt-2">
                {data.representativeName}
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
          <div className='grid grid-cols-2 gap-3'>
            <DetailButton accountId={""}/>
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
        href={`/profile/${accountId}`}
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