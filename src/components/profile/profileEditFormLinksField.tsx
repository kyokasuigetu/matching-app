'use client';

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFieldArray } from "react-hook-form";
import { ProfileEditFormFieldProps } from "@/types/profile";
import { constants } from "@/lib/constants";

export function ProfileEditFormLinksField({ form }: ProfileEditFormFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  return (
    <div className="space-y-3">
      <FormLabel className="font-semibold">リンク</FormLabel>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-3">
          <FormField
            control={form.control}
            name={`links.${index}.label`}
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="種類を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {constants.linkLabel.map((label) => (
                        <SelectItem key={label} value={label}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* URL Input */}
          <FormField
            control={form.control}
            name={`links.${index}.url`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delete Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ))}

      {/* 追加ボタン */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ label: "", url: "" })}
      >
        <Plus className="w-4 h-4 mr-1" /> リンクを追加
      </Button>
    </div>
  );
}
