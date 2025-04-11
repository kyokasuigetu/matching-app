import { redirect } from 'next/navigation';
import { Profile } from './profile';
import { getUserIdFromEmail } from "@/server/services/getUserIdFromEmail";

export default async function ProfilePage() {
  const authUserId: string | null = await getUserIdFromEmail();

  // 認証ユーザーじゃない場合は/signinにリダイレクト
  if (authUserId === null) {
    redirect('/signin');
  }

  return <Profile userId={authUserId} isMyPage={true} />;
}
