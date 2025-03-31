import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, emailFormValues } from "@/schemas/authSchemas";

export function useLogin() {
  const form = useForm<emailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: emailFormValues) => {
    console.log("登録データ:", data);
  };

  return { form, onSubmit };
}
