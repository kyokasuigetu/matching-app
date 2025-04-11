import { SmallBar, LargeBar } from "@/components/search";
import { getAllCategories } from "@/server/usecases/getAllCategories";
import { OutputCategory } from "@/types/category";

export async function SearchBar() {
  const categories: OutputCategory = await getAllCategories();

  return (
    <aside className="p-5 border-b-1 border-gray-100 md:border-b-0">
      {/* スマホ・タブレットサイズ */}
      <div className="md:hidden">
        <SmallBar categories={categories} />
      </div>

      {/* PCサイズ */}
      <div className="md:sticky md:top-0 hidden md:block min-w-[240px]">
        <LargeBar categories={categories} />
      </div>
    </aside>
  );
}
