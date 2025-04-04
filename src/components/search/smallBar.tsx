'use client';

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/profile";

type SmallBarProps = {
  categories: Category[];
};


export function SmallBar({ categories }: SmallBarProps) {
  return (
    <>
      <h1 className="text-center mb-5">カテゴリ</h1>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category: Category, index: number) => {
            // 各Categoryは1つのキーと値のペアを持つと仮定
            const [categoryName, items] = Object.entries(category)[0];
            return (
              <SelectGroup key={index}>
                <SelectLabel className="text-lg font-bold border-b-1 border-gray-100">
                  {categoryName}
                </SelectLabel>
                {items.map((item: string, idx: number) => (
                  <SelectItem key={`${index}-${idx}`} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
