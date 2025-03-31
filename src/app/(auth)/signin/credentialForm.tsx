import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm, RegisterForm } from "@/components/auth";

export function CredentialForm() {
  return (
    <Tabs defaultValue="signin" className="max-w-[400px] w-full">
      <h1 className="text-center text-md">メールアドレスとパスワードはこちらから</h1>
      <TabsList className="w-full">
        <TabsTrigger value="signin">ログイン</TabsTrigger>
        <TabsTrigger value="signup">新規登録</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
