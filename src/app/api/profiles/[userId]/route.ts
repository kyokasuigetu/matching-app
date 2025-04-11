import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { prisma } from "@/lib/prisma";
import { apiAuth } from "@/lib/apiAuth";
import { getProfile } from "@/server/usecases/profiles/getProfile";
import { OutputProfileWithStatus } from "@/types";
import { NoEmailError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  // 認証失敗時はJSONで401と { message: "unauthorized" } を返す
  const authResult: NextResponse | Session = await apiAuth();

  if (authResult instanceof NextResponse) {
    // 認証に失敗した場合、そのレスポンスを返す
    return authResult;
  }

  const { userId } = await params;

  // 入力値のバリデーション　UserIdの存在チェック
  if (!userId) {
    return NextResponse.json(
      { message: "Validation Error", errors: [{ field: "userId", error: "userIdは必須です。" }] },
      { status: 422 }
    );
  }

  try {
    // プロフィールを取得する
    const profile: OutputProfileWithStatus | null = await getProfile({
        userId:  userId,
        session: authResult, // 必ずSession型になる前提で入れている
        prisma:  prisma,
      });

    if (profile === null) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);

  } catch (error) {
    console.error("Error fetching profile:", error);

    // メールが存在しない場合のエラーハンドリング
    if (error instanceof NoEmailError) {
      return NextResponse.json(
        { message: "No email found in session" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}