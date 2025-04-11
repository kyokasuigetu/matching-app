import { redirect } from 'next/navigation';
import { ProfileEditForm } from './profileEditForm';
import { getUserIdFromEmail } from '@/server/services/getUserIdFromEmail';
import { prisma } from '@/lib';
import { getAllCategories } from '@/server/usecases/getAllCategories';

type Props = {
  params: Promise<{ userId: string }>;
};

export default async function ProfileEditPage({ params }: Props) {
  const { userId } = await params;

  // 認可　認証ユーザーとURLのuserIdが一致するか確認
  const authUserId: string | null = await getUserIdFromEmail();

  // 認証ユーザーが存在しない場合は/signinへ
  if (!authUserId) {
    // todo: Flash出してリダイレクトしたい。
    console.log('認証ユーザーが存在しません。ログインしてください。');
    redirect('/signin');
  }

  // 認証ユーザーと一致しない場合は/profileにリダイレクト
  if (userId !== authUserId) {
    // todo: Flash出してリダイレクトしたい。
    console.log('このユーザーのプロフィールを編集する権限がありません。')
    redirect("/profile");
  }

  const props = {
    authUserId: authUserId,
    categories: await getAllCategories(prisma),
  };

  return (
    <div className='pb-10'>
      <h1 className="text-center text-lg font-bold my-5">
        Profile 作成/編集フォーム
      </h1>
      <ProfileEditForm {...props} />
    </div>
  );
}
