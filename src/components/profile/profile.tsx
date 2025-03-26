"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Building2, Briefcase, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// モックデータ
interface Profile {
  id: string;
  name: string;
  logo: string;
  industry: string[];
  message: string;
  isOwnProfile: boolean;
  foundedYear: number;
  location: string;
  employeeCount: string;
  website: string;
}

export function Profile({
  profile = {
    id: "company123",
    name: "テクノソリューション株式会社",
    logo: "/placeholder.svg?height=100&width=100",
    industry: ["ITコンサルティング", "システム開発", "クラウドサービス"],
    message:
      "当社は創業以来20年間、企業のデジタルトランスフォーメーションを支援してきました。お客様のビジネス課題を解決するためのテクノロジーソリューションを提供しています。新しいパートナーシップやコラボレーションの機会を探しておりますので、ぜひお気軽にご連絡ください。",
    isOwnProfile: true, // 自分のプロフィールかどうか
    foundedYear: 2003,
    location: "東京都港区",
    employeeCount: "50-100人",
    website: "www.technosolutions.co.jp",
  },
}: {
  profile?: Profile;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="overflow-hidden">
        {/* ヘッダー部分 - 背景色付き */}
        <div className="bg-primary/10 h-32 relative">
          {profile.isOwnProfile && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 gap-1"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
              プロフィールを編集
            </Button>
          )}
        </div>

        {/* プロフィール情報 */}
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row gap-6 -mt-12 sm:-mt-16">
            {/* アバター */}
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background">
                <AvatarImage src={profile.logo} alt={profile.name} />
                <AvatarFallback className="text-2xl">
                  {profile.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* 会社情報 */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold mt-2">{profile.name}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.industry.map((ind, index) => (
                    <Badge key={index} variant="secondary">
                      {ind}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>設立: {profile.foundedYear}年</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>従業員数: {profile.employeeCount}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span>所在地: {profile.location}</span>
                </div>
              </div>

              <div className="pt-2">
                <h2 className="text-lg font-medium mb-2">企業メッセージ</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {profile.message}
                </p>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <a
                  href={`https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {profile.website}
                </a>

                {!profile.isOwnProfile && (
                  <Button className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    メッセージを送る
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 編集ダイアログ (モック) */}
      {profile.isOwnProfile && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>プロフィールを編集</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-muted-foreground">
                ここに編集フォームが表示されます。実際の実装では、フォームコンポーネントを追加してください。
              </p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setIsEditing(false)}>閉じる</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
