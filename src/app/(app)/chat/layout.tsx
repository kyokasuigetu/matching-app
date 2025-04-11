"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SearchQuery, Rooms } from "@/components/chat/index";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, setMounted] = useState(false);
  const pathname = usePathname();
  const pathId = pathname ? pathname.split("/").pop() : "";

  // コンポーネントがクライアントでマウントされたことを示す
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-full">
      {/* チャットルーム一覧 */}
      <div
        className={`flex flex-col max-w-xl w-full md:max-w-sm mx-auto mb-1 p-3 md:p-0 ${
          // モバイル時、pathIdが存在すれば非表示、なければ表示
          pathId !== "chat" ? "hidden md:block" : "block"
        }`}
      >
        {/* <SearchQuery /> */}
        <Rooms />
      </div>

      {/* トークルーム */}
      <div
        className={`bg-gray-50 w-full h-screen shadow-inner ${
          // モバイル時、pathIdが存在すれば表示、なければ非表示
          pathId !== "chat" ? "block" : "hidden"
        } md:block`}
      >
        {children}
      </div>
    </div>
  );
}
