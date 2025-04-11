"use client";

import { Form } from "@/components/ui/form";
import { useProfileEditForm } from "@/hooks/useProfileEditForm";
import { OutputCategory } from "@/types/category";
import {
  ProfileEditFormCompanyNameField,
  ProfileEditFormContactNameField,
  ProfileEditFormCompanyHistoryField,
  ProfileEditFormBusinessDescriptionField,
  ProfileEditFormMessageField,
  ProfileEditFormEmployeeCountField,
  ProfileEditFormEstablishmentYearField,
  ProfileEditFormCapitalField,
} from "@/components/profile/profileEditFormFields";
import { ProfileEditFormCategoryField } from "@/components/profile/profileEditFormCategoryField";
import { ProfileEditFormLinksField } from "@/components/profile/profileEditFormLinksField";

interface Props {
  authUserId: string;
  categories: OutputCategory;
}

export function ProfileEditForm({ authUserId, categories }: Props) {
  const {
    form,
    isLoading,
    isSubmitting,
    error,
    onSubmit
  } = useProfileEditForm({ authUserId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
        className="max-w-lg w-full mx-auto p-5 space-y-8"
      >
        {/* userId 非表示 */}
        <input type="hidden" {...form.register("userId")} />

        {/* 会社名 */}
        <ProfileEditFormCompanyNameField form={form} />

        {/* 担当者名 */}
        <ProfileEditFormContactNameField form={form} />

        {/* 沿革 */}
        <ProfileEditFormCompanyHistoryField form={form} />

        {/* 事業説明 */}
        <ProfileEditFormBusinessDescriptionField form={form} />

        {/* メッセージ */}
        <ProfileEditFormMessageField form={form} />

        {/* 従業員数 */}
        <ProfileEditFormEmployeeCountField form={form} />

        {/* 設立年 */}
        <ProfileEditFormEstablishmentYearField form={form} />

        {/* 資本金 */}
        <ProfileEditFormCapitalField form={form} />

        {/* カテゴリ（仮：カンマ区切り文字列で入力） */}
        <ProfileEditFormCategoryField form={form} categories={categories} />

        {/* リンク（仮：カンマ区切り文字列で入力） */}
        <ProfileEditFormLinksField form={form} />

        <button
          type="submit"
          className="w-full border-1 rounded-lg p-3 text-white bg-black disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "更新中..." : "プロフィールを更新する"}
        </button>
      </form>
    </Form>
  );
}
