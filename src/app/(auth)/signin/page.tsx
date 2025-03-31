import { CredentialForm } from "@/app/(auth)/signin/credentialForm";
import { OAuth } from './oauth';

export default function SignUpPage() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center p-5">
      <div className="max-w-[400px] w-full grid grid-cols-1 gap-10">
        <h1 className="flex flex-col justify-center items-center">
          <span className="font-bold text-xl">--- Set Logo ---</span>
          <span className="font-bold text-lg">アカウント作成</span>
        </h1>

        {/* Google, Facebook, LINE */}
        <OAuth />

        {/* メールアドレス＋パスワードで登録するフォーム */}
        <CredentialForm />
      </div>
    </div>
  );
}
