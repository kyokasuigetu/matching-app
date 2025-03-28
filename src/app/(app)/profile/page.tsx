import { Profile } from './profile';
import { Profile as ProfileType } from '@/types';
import { getAccount } from '@/lib/mocks';

export default function ProfilePage() {
  const profile: ProfileType = getAccount('ownUser123');

  return (
    <>
      <Profile profile={profile} />
    </>
  );
}