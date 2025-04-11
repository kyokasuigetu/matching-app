"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { OutputCategory, OutputSubCategory } from "@/types/category";

type SmallBarProps = {
  categories: OutputCategory;
};

export function SmallBar({ categories }: SmallBarProps) {
  const router = useRouter();
  const [, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | undefined>(undefined);

  const handleSelectChange = (value: string) => {
    setSelectedSubcategoryId(value);
    let foundCategory: string | null = null;
    for (const [cat, subs] of Object.entries(categories)) {
      if (subs.some((sub: OutputSubCategory) => String(sub.id) === value)) {
        foundCategory = cat;
        break;
      }
    }
    setSelectedCategory(foundCategory);
    router.push(`/search?categoryId=${value}`);
  };

  return (
    <>
      <h1 className="text-center mb-5">カテゴリ</h1>
      <Select value={selectedSubcategoryId} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(categories).map(
            ([category, subCategories], index) => (
              <SelectGroup key={index}>
                <SelectLabel className="text-lg font-bold border-b border-gray-100">
                  {category}
                </SelectLabel>
                {subCategories.map((subCategory: OutputSubCategory) => (
                  <SelectItem
                    key={subCategory.id}
                    value={String(subCategory.id)}
                  >
                    {subCategory.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            )
          )}
        </SelectContent>
      </Select>
    </>
  );
}
