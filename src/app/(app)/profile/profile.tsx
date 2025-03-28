import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
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
      <Card className="overflow-hidden">
        {/* ヘッダー部分 - 背景色付き */}
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={data.background || "/company.png"}
            alt="背景画像"
            fill
            className="h-full w-full object-cover"
          />
          {isOwnProfile && (
            <Link
              href={`/profile/${data.id}/edit`}
              className="absolute top-4 right-4 flex items-center gap-1 bg-white text-primary/90 p-2 rounded-md
              shadow hover:shadow-md transition"
            >
              <Pencil className="h-4 w-4" />
              プロフィールを編集
            </Link>
          )}
        </AspectRatio>

        {/* プロフィール情報 */}
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row gap-6 -mt-12 sm:-mt-16">
            {/* アバター */}
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white bg-white">
                <AvatarImage
                  src={data.icon || "company-image.png"}
                  alt={data.companyName}
                />
                <AvatarFallback className="text-2xl">
                  {data.companyName}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* 会社情報 */}
            <div className="flex-1 space-y-4">
              <div>
                {/* 社名 + 代表者名 */}
                <h1 className="relative z-10 p-3 text-2xl font-bold sm:mt-10">
                  {data.companyName}
                  <span className="block text-sm font-medium mt-2">
                    {data.representativeName}
                  </span>
                </h1>
                {/* カテゴリ */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.industry &&
                    data.industry.map((ind, index) => (
                      <Badge key={index} variant="secondary">
                        {ind}
                      </Badge>
                    ))}
                </div>
              </div>

              {/* アイコン + ステータスのゾーン */}
              <ProfileStatus data={data} />

              {/* タイトル + 説明書きのゾーン */}
              <ProfileTextSections data={data} />

              {/* リンク一覧 */}
              <div className="my-10">
                <h2 className="text-lg font-medium mb-2">リンク</h2>
                <Links links={data.links ? data.links : []} />
              </div>

              {/* トークルームへ飛ばすボタン */}
              {!isOwnProfile && <DMButton />}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
