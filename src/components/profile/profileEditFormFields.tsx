"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { constants, toEmployeeCountEnum } from "@/lib/constants";
import type { ProfileEditFormFieldProps } from "@/types/profile";

export function ProfileEditFormCompanyNameField({
  form,
}: ProfileEditFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="companyName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>会社名</FormLabel>
          <FormControl>
            <Input placeholder="株式会社〇〇" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ProfileEditFormContactNameField({
  form,
}: ProfileEditFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="contactName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>担当者名</FormLabel>
          <FormControl>
            <Input placeholder="山田 太郎" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ProfileEditFormCompanyHistoryField({
  form,
}: ProfileEditFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="companyHistory"
      render={({ field }) => (
        <FormItem>
          <FormLabel>沿革</FormLabel>
          <FormControl>
            <Textarea placeholder="企業の沿革" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ProfileEditFormBusinessDescriptionField({
  form,
}: ProfileEditFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="businessDescription"
      render={({ field }) => (
        <FormItem>
          <FormLabel>事業説明</FormLabel>
          <FormControl>
            <Textarea placeholder="事業内容の説明" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ProfileEditFormMessageField({
  form,
}: ProfileEditFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>メッセージ</FormLabel>
          <FormControl>
            <Textarea placeholder="メッセージ" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ProfileEditFormEmployeeCountField({
  form,
}: ProfileEditFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="employeeCount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>従業員数</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value || "1~9人"}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="従業員数を選択" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {constants.employeeCount.map((count) => (
                <SelectItem key={count} value={count}>
                  {toEmployeeCountEnum(count)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

export function ProfileEditFormEstablishmentYearField({
  form,
}: ProfileEditFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="establishmentYear"
      render={({ field }) => (
        <FormItem>
          <FormLabel>設立年</FormLabel>
          <FormControl>
            <Input placeholder="2000" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ProfileEditFormCapitalField({
  form,
}: ProfileEditFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="capital"
      render={({ field }) => (
        <FormItem>
          <FormLabel>資本金</FormLabel>
          <FormControl>
            <Input type="number" placeholder="例: 1000000" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
