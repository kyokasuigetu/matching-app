'use client';

import { useState } from "react"
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { OutputCategory, OutputSubCategory } from "@/types/category";

type LargeBarProps = {
  categories: OutputCategory;
};

export function LargeBar({ categories }: LargeBarProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory]        = useState<string | null>(null);
  const [selectedSubcategoryId, selectedSubCategoryId] = useState<number | null>(null);

  const handleCategoryClick = (
    category: string,
    subcategoryId: number
  ): void => {
    // カテゴリがクリックされたとき、選択されたサブカテゴリをリセット
    setSelectedCategory(category);
    selectedSubCategoryId(subcategoryId);

    // URLを更新
    router.push(`/search?categoryId=${subcategoryId}`);
  };

  return (
    <div className="w-full h-screen bg-background border-r flex flex-col">
      {/* サイドバーヘッダー */}
      <h2 className="text-lg font-semibold mb-2">カテゴリ検索</h2>

      {/* カテゴリリスト */}
      <div className="flex-1 overflow-auto py-2">
        <Accordion
          type="multiple"
          defaultValue={Object.keys(categories)}
          className="w-full"
        >
          {Object.entries(categories).map(([category, subcategories]) => (
            <AccordionItem
              value={category}
              key={category}
              className="border-b-0"
            >
              <AccordionTrigger className="py-3 px-4 hover:bg-muted/50 text-sm font-medium">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="py-1">
                  {subcategories.map((subcategory: OutputSubCategory) => (
                    <li key={subcategory.id}>
                      <button
                        className={cn(
                          "w-full text-left py-2 px-8 text-sm transition-colors hover:bg-muted/50",
                          selectedCategory === category &&
                            selectedSubcategoryId === subcategory.id
                            ? "font-medium text-gray-300 bg-black"
                            : "font-medium"
                        )}
                        onClick={() =>
                          handleCategoryClick(category, subcategory.id)
                        }
                      >
                        {subcategory.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* サイドバーフッター */}
      <div className="p-4 border-t bg-muted/30">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            全てのカテゴリを表示
          </span>
          <span className="text-xs font-medium text-primary">
            {Object.values(categories).flat().length} 項目
          </span>
        </div>
      </div>
    </div>
  );
}
