'use client';

import { useState } from "react";

export function useChatRooms() {
  const [searchQuery, setSearchQuery] = useState("");

  // 検索クエリに基づくフィルタリング
  const filteredChatRooms = chatRooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredChatRooms
  };
}

// モックデータ
const chatRooms = [
  {
    id: "1",
    name: "田中 健太",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "明日の打ち合わせの件ですが、13時からでよろしいでしょうか？",
    timestamp: "14:30",
    unread: true,
  },
  {
    id: "2",
    name: "佐藤 美咲",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "資料を送りました。ご確認お願いします。",
    timestamp: "昨日",
    unread: false,
  },
  {
    id: "3",
    name: "鈴木 大輔",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "お疲れ様です！プロジェクトの進捗はいかがですか？",
    timestamp: "昨日",
    unread: true,
  },
  {
    id: "4",
    name: "山田 花子",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "ありがとうございます。確認しました。",
    timestamp: "月曜日",
    unread: false,
  },
  {
    id: "5",
    name: "伊藤 直樹",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "週末お疲れ様でした。今週もよろしくお願いします。",
    timestamp: "月曜日",
    unread: false,
  },
  {
    id: "6",
    name: "渡辺 真理",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage:
      "新しいデザイン案を共有しました。フィードバックをお願いします。",
    timestamp: "先週",
    unread: false,
  },
  {
    id: "7",
    name: "高橋 健太郎",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "明日の会議は10時からですね。準備しておきます。",
    timestamp: "先週",
    unread: false,
  },
];
