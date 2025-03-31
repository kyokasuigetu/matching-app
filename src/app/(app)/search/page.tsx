import { SearchBar } from './searchBar';
import { ProfileList } from './profileList';

export default function SearchPage() {
  return (
    <div className='flex flex-col md:flex-row'>
      {/* 検索窓用のサイドバー */}
      <SearchBar />

      {/* 事業者一覧 */}
      <ProfileList />
    </div>
  );
}