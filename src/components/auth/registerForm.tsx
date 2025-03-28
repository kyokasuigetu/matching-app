"use client";

import * as React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister }  from "@/hooks";

export function RegsiterForm() {
  const { form, onSubmit } = useRegister();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6"
      >
        <h1 className="flex flex-col justify-center items-center">
          <span className="font-bold text-xl">--- Set Logo ---</span>
          <span className="font-bold text-lg">アカウント作成</span>
        </h1>
        <div className="space-y-4">
          {/* 会社名フィールド */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>会社名</FormLabel>
                <FormControl>
                  <Input placeholder="株式会社サンプル" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 担当者名フィールド */}
          <FormField
            control={form.control}
            name="personalName"
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
          {/* メールアドレスフィールド */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* パスワードフィールド */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          登録する
        </Button>
      </form>
    </Form>
  );
}
