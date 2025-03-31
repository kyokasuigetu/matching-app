"use client";

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
import { useLogin } from "@/hooks";

export function LoginForm() {
  const { form, onSubmit, state, isPending } = useLogin();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-10 pt-5"
      >
        <h1 className="text-center text-md font-bold mb-5">
          メールアドレスでの認証
        </h1>
        <div className="space-y-4">
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
        </div>

        {/* エラーメッセージと成功メッセージの表示 */}
        {state.error &&
          <p className="text-red-500">
            {state.error}
          </p>
        }
        {state.success &&
          <p className="text-green-500">
            {state.success}
          </p>
        }

        {/* 送信ボタン */}
        <Button type="submit" className="w-full">
          {isPending ? "送信中..." : "メールアドレスに認証コード付きURLを送信"}
        </Button>
      </form>
    </Form>
  );
}
