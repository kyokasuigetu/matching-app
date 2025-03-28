import { Profile } from "@/components/profile/index";
import { Profile as ProfileType } from "@/types";
import { getAccount } from "@/lib/mocks";

export default async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;
  const profile: ProfileType = getAccount(accountId);

  return (
    <>
      <Profile profile={profile} />
    </>
  );
}
