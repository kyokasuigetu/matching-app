import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { emailSchema, emailFormValues } from "@/schemas/authSchemas";

// 状態の型定義
interface ActionState {
  error: string;
  success: string;
}

export function useLogin() {
  const [state, setState] = useState<ActionState>({
    error: "",
    success: ""
  });
  const [isPending, setIsPending] = useState(false);

  const form = useForm<emailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: emailFormValues) => {
    try {
      setIsPending(true);

      const email = data.email;

      await signIn("email", {
        email,
        redirect: false,
      });

      setIsPending(false);

      return setState({
        error: "",
        success: "確認メールを送信しました。確認メールのURLにアクセスしてください。",
      });
    } catch (error) {
      setIsPending(false);

      console.error("Failed to sign in", error);

      return setState({
        error: "エラーが発生しました。もう一度お試しいただくか、管理者にお問い合わせください。",
        success: ""
      });
    }
  };

  return { form, onSubmit, state, isPending };
}
