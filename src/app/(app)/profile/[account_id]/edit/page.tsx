import { ProfileEditForm } from '@/components/profile';
import { getAccount } from '@/lib/mocks';

export default function ProfileEditPage() {
  const profile = getAccount('ownUser123');

  return (
    <>
      <ProfileEditForm old={profile} />
    </>
  );
}