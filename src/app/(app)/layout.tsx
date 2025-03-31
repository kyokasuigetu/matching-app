import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Header from "@/components/common/header";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  // ログインしていない場合は"/signin"にリダイレクト
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto">{children}</main>
    </>
  );
}
