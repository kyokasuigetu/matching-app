'use client';

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export function LargeBar() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)

  return (
    <div className="w-full h-screen bg-background border-r flex flex-col">
      {/* サイドバーヘッダー */}
      <h2 className="text-lg font-semibold mb-2">カテゴリ検索</h2>

      {/* カテゴリリスト */}
      <div className="flex-1 overflow-auto py-2">
        <Accordion type="multiple" defaultValue={Object.keys(lists)} className="w-full">
          {Object.entries(lists).map(([category, subcategories]) => (
            <AccordionItem value={category} key={category} className="border-b-0">
              <AccordionTrigger className="py-3 px-4 hover:bg-muted/50 text-sm font-medium">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="py-1">
                  {subcategories.map((subcategory) => (
                    <li key={subcategory}>
                      <button
                        className={cn(
                          "w-full text-left py-2 px-8 text-sm transition-colors hover:bg-muted/50",
                          selectedCategory === category && selectedSubcategory === subcategory
                            ? "bg-muted font-medium text-primary"
                            : "text-muted-foreground",
                        )}
                        onClick={() => {
                          setSelectedCategory(category)
                          setSelectedSubcategory(subcategory)
                        }}
                      >
                        {subcategory}
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
          <span className="text-xs text-muted-foreground">全てのカテゴリを表示</span>
          <span className="text-xs font-medium text-primary">{Object.values(lists).flat().length} 項目</span>
        </div>
      </div>
    </div>
  );
}

const lists = {
  IT: [
    "Web制作",
    "アプリ開発",
    "システム開発",
    "ネットワーク構築",
    "セキュリティ対策",
    "その他",
  ],
  デザイン: [
    "Webデザイン",
    "グラフィックデザイン",
    "UI/UXデザイン",
    "その他",
  ],
  マーケティング: ["SEO", "SNS", "コンテンツ", "広告", "その他"],
};