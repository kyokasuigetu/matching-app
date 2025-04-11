import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ProfileFormValues } from "@/schemas/profileSchema";
import { OutputCategory, OutputSubCategory } from "@/types/category";

interface Props {
  form: UseFormReturn<ProfileFormValues>;
  categories: OutputCategory;
}

export function ProfileEditFormCategoryField({ form, categories }: Props) {
  function handleCategoryCheckboxChange(
    checked: CheckedState,
    categoryId: number,
    current: number[],
    onChange: (value: number[]) => void
  ) {
    if (checked) {
      if (current.length < 5 && !current.includes(categoryId)) {
        onChange([...current, categoryId]);
      }
    } else {
      onChange(current.filter((value) => value !== categoryId));
    }
  }

  return (
    <FormField
      control={form.control}
      name="categories"
      render={() => (
        <FormItem>
          <FormLabel className="font-bold">事業カテゴリ</FormLabel>
          <FormDescription>
            カテゴリを選択してください（最大5つまで）
          </FormDescription>
          {Object.entries(categories).map(([categoryName, subCategories]) => (
            <div key={categoryName} className="space-y-2 p-4 border-b-1">
              <h3 key={categoryName} className="font-semibold">
                {categoryName}
              </h3>
              <div className="flex flex-wrap gap-4">
                {subCategories.map((category: OutputSubCategory) => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem key={category.id} className="flex gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(category.id)}
                              onCheckedChange={(checked: CheckedState) =>
                                handleCategoryCheckboxChange(
                                  checked,
                                  category.id,
                                  field.value ?? [], // field.value が undefined の可能性があるので field.value ?? [] として防御
                                  field.onChange
                                )
                              }
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {category.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
