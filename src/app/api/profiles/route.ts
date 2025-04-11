import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiAuth } from "@/lib/apiAuth";
import { UnauthorizedError, ForbiddenError, ValidationError } from "@/lib/errors";
import { getProfiles } from "@/server/usecases/profiles/getProfiles";
import { updateProfile } from "@/server/usecases/profiles/updateProfile";
import { constants } from "@/lib/constants";
import { isValidUrl } from "@/lib/helpers";
import { ProfileParams } from "@/types";
import { ProfileInput } from "@/types/profile";

export async function GET(request: NextRequest) {
  // 認証失敗時は401を返す。　
  const authResult = await apiAuth();

  if (authResult instanceof NextResponse) {
    // 認証に失敗した場合、そのレスポンスを返す
    return authResult;
  }

  try {
    const { searchParams } = new URL(request.url);

    // limitの取得
    const limitParam = searchParams.get("limit");

    let limit: number | null = null;

    // limitがnullじゃない時はバリデーション
    if (limitParam !== null) {
      limit = parseInt(limitParam);
      if (isNaN(limit) || limit <= 0) {
        return NextResponse.json(
          {
            message: "Validation Error",
            errors: [
              { field: "limit", error: "limitは自然数である必要があります。" },
            ],
          },
          { status: 422 }
        );
      }
    }

    // cursorの取得
    const cursorUpdatedAt = searchParams.get("cursorUpdatedAt");
    const cursorUserId    = searchParams.get("cursorUserId");

    // cursorがnullじゃない時はバリデーション
    if (cursorUpdatedAt || cursorUserId) {
      // 両方揃ってない時はエラー
      if (!cursorUpdatedAt || !cursorUserId) {
        return NextResponse.json(
          {
            message: "Validation Error",
            errors: [
              {
                field: "cursor",
                error: "cursorのupdatedAtとuserIdは両方必要です。",
              },
            ],
          },
          { status: 422 }
        );
      }

      // cursorのupdatedAtが有効な日付文字列かチェック
      if (isNaN(Date.parse(cursorUpdatedAt))) {
        return NextResponse.json(
          {
            message: "Validation Error",
            errors: [
              {
                field: "cursor",
                error:
                  "cursor.updatedAtは有効な日付文字列である必要があります。",
              },
            ],
          },
          { status: 422 }
        );
      }
    }

    // categoryの取得（subCategryIdかnull）
    const categoryId: number | null = searchParams.get("categoryId")
      ? Number(searchParams.get("categoryId"))
      : null;

    // 入力パラメータの組み立て
    const params: ProfileParams = {
      limit: limit,
      cursor: {
        updatedAt: cursorUpdatedAt ? cursorUpdatedAt : null,
        userId: cursorUserId ? cursorUserId : null,
      },
      categoryId: categoryId ?? null,
    };

    // getProfilesを実行
    const profilesResult = await getProfiles(prisma, params);

    return NextResponse.json(profilesResult, { status: 200 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 認証失敗時は401を返す。
    const authResult = await apiAuth();

    if (authResult instanceof NextResponse) {
      // 認証に失敗した場合、そのレスポンスを返す
      throw new UnauthorizedError();
    }

    // リクエストボディからフォームの送信データを JSON として取得する
    const profileData: ProfileInput = await request.json();

    // 422系のバリデーション
    const validationErrors: { field: string; error: string }[] = await validateProfileInput(profileData);

    if (validationErrors.length > 0) {
      throw new ValidationError(validationErrors);
    }

    const result = await updateProfile(profileData);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    // 401 認証エラー
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }

    // 403 Forbidden 送ったUserIdと認証ユーザーのIDが一致しないとき
    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }

    // 422 Validation Error
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { message: error.message, errors: error.errors },
        { status: error.status }
      );
    }

    // 500 Internal Server Error
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function validateProfileInput(profileData: ProfileInput) {
  const errors: { field: string; error: string }[] = [];

  // userId (string)
  // 必須チェック: 必ず値が入力されていること。
  if (!profileData.userId) {
    errors.push({ field: "userId", error: "userIdは必須です。" });
  }

  // companyName (string | null)
  // 型チェック: 入力される場合は文字列であること。
  if (profileData.companyName && typeof profileData.companyName !== "string") {
    errors.push({ field: "companyName", error: "companyNameは文字列です。" });
  }

  // 最大文字数: 必要に応じて、会社名の長さを制限する（例：「〇〇株式会社」程度など）。
  if (profileData.companyName && profileData.companyName.length > 100) {
    errors.push({
      field: "companyName",
      error: "companyNameは100文字以内である必要があります。",
    });
  }

  // contactName (string | null)
  // 型チェック: 入力される場合は文字列であること。
  if (profileData.contactName && typeof profileData.contactName !== "string") {
    errors.push({ field: "contactName", error: "contactNameは文字列です。" });
  }

  // 最大文字数: 必要に応じて、名前の長さを制限する。
  if (profileData.contactName && profileData.contactName.length > 100) {
    errors.push({
      field: "contactName",
      error: "contactNameは100文字以内である必要があります。",
    });
  }

  // businessDescription (string | null)
  // 型チェック: 入力される場合は文字列。
  if (
    profileData.businessDescription &&
    typeof profileData.businessDescription !== "string"
  ) {
    errors.push({
      field: "businessDescription",
      error: "businessDescriptionは文字列です。",
    });
  }

  // 内容チェック: LLM が読み取りやすい文章かどうかは難しいですが、必要であれば最小文字数・最大文字数（例：最大1000文字程度）を設定する。
  if (
    profileData.businessDescription &&
    profileData.businessDescription.length > 1000
  ) {
    errors.push({
      field: "businessDescription",
      error: "businessDescriptionは1000文字以内である必要があります。",
    });
  }

  // message (string | null)
  // 型チェック: 入力される場合は文字列。
  if (profileData.message && typeof profileData.message !== "string") {
    errors.push({ field: "message", error: "messageは文字列です。" });
  }

  // history (string | null)
  // 型チェック: 入力される場合は文字列。
  // 最大文字数: 最大1000文字程度に制限する（スキーマ例では "沿革は最大1000文字までです。" としている）。
  if (profileData.companyHistory && typeof profileData.companyHistory !== "string") {
    errors.push({ field: "companyHistory", error: "companyHistoryは文字列です。" });
  }

  // employeeCount (EmployeeCount | null)
  // 必須性: 入力がなければ null になっていること（nullable）。
  if (profileData.employeeCount === null) {
    errors.push({ field: "employeeCount", error: "employeeCountは必須です。" });
  }

  // foundedYear (number | null)
  // 数値チェック: 整数であること。
  if (profileData.foundedYear && typeof profileData.foundedYear !== "number") {
    errors.push({ field: "foundedYear", error: "foundedYearは整数です。" });
  }

  // 現実的な範囲: たとえば、負の値や極端に未来の値にならないよう、最低値（例: 1800 や 1900）および最大値（現在の西暦）を検証する。
  if(
    profileData.foundedYear &&
    (profileData.foundedYear < 1800 || profileData.foundedYear > new Date().getFullYear())
  ) {
    errors.push({
      field: "foundedYear",
      error: "foundedYearは1800年から現在までの範囲である必要があります。",
    });
  }

  // capital (number | null)
  // 数値チェック: 整数かつ 0 以上であること。
  if (profileData.capital && typeof profileData.capital !== "number") {
    errors.push({ field: "capital", error: "capitalは整数です。" });
  }

  // 現実的な値: 極端に小さい値や不自然な値（負の値）はエラーとする。
  if (profileData.capital && profileData.capital < 0) {
    errors.push({
      field: "capital",
      error: "capitalは0以上である必要があります。",
    });
  }

  // categories (number[] | [])
  // 型チェック: 配列であること、かつその各要素が数値であること。
  if (
    !Array.isArray(profileData.categories) ||
    !profileData.categories.every((category) => typeof category === "number")
  ) {
    errors.push({
      field: "categories",
      error: "categoriesは数値の配列である必要があります。",
    });
  }

  // 件数制限: 配列の要素数が最大5個であること。
  if (profileData.categories.length > 5) {
    errors.push({
      field: "categories",
      error: "categoriesは最大5つの要素を持つ必要があります。",
    });
  }

  // links (Link[] | null)
  // 型チェック: 配列であり、各リンクオブジェクトが正しい形（例えば、{ label: LinkLabel, url: string }）であること。
  if (
    profileData.links &&
    Array.isArray(profileData.links) &&
    !profileData.links.every(
      (link) =>
        typeof link === "object" &&
        typeof link.url === "string" &&
        typeof link.label === "string"
    )
  ) {
    errors.push({
      field: "links",
      error:
        "linksは { label, url } の形式のオブジェクト配列である必要があります。",
    });
  }

  // 各リンクオブジェクト:
  // label: "corporateSite", "facebook", "x", "instagram", "youTube", "linkedIn", "others" のいずれかであること（列挙型の検証）。
  if (
    profileData.links &&
    profileData.links.some(
      (link) =>
        !constants.linkLabel.includes(link.label as typeof constants.linkLabel[number])
    )
  ) {
    errors.push({
      field: "links",
      error: "linksのlabelは指定された範囲内である必要があります。",
    });
  }

  // url: 有効なURL形式になっていること。スキーマ例では、正しくない場合に「有効なURLを入力してください。」というエラーメッセージを出すようにしている。
  if (
    profileData.links &&
    profileData.links.some((link) => !isValidUrl(link.url))
  ) {
    errors.push({
      field: "links",
      error: "linksのurlは有効なURL形式である必要があります。",
    });
  }

  return errors;
}
