import { Profile } from './profile';
import { Profile as ProfileType } from '@/types';
import { getAccount } from '@/lib/mocks';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function ProfilePage() {
  const profile: ProfileType = getAccount('ownUser123');

  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <>
      <Profile profile={profile} />
    </>
  );
}