import { Profile } from "../profile";

export default async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <>
      <Profile userId={userId} />
    </>
  );
}
