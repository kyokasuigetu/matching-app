import { SmallBar, LargeBar } from "@/components/search";

export function SearchBar() {
  return (
    <aside className="p-5 border-b-1 border-gray-100 md:border-b-0">
      {/* スマホ・タブレットサイズ */}
      <div className="md:hidden">
        <SmallBar />
      </div>

      {/* PCサイズ */}
      <div className="md:sticky md:top-0 hidden md:block min-w-[240px]">
        <LargeBar />
      </div>
    </aside>
  );
}
