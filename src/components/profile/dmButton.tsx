'use client';

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function DMButton () {
  const onClick = () => {
    console.log("トークルームに飛ぶ");
  }

  return (
    <Button
      onClick={onClick}
      className="w-full bg-black rounded-4xl"
    >
      <div className="flex items-center gap-4 font-bold">
        <MessageSquare className="h-5 w-5" />
        メッセージを送る
      </div>
    </Button>
  );
}