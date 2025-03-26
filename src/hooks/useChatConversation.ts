'use client';

import { useState, useRef, useEffect } from "react";

export function useChatConversion (matchId: string) {
  console.log(matchId);

  const [partner, setPartner] = useState(mockPartner);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージを送信
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: `msg${messages.length + 1}`,
      senderId: "currentUser",
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  // Enterキーで送信
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 新しいメッセージが追加されたら自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return {
    partner,
    messages,
    setMessages,
    newMessage,
    setNewMessage,
    handleKeyPress,
    handleSendMessage,
    messagesEndRef
  };
}

// モックデータ
const mockPartner = {
  id: "user123",
  name: "田中 健太",
  avatar: "/placeholder.svg?height=40&width=40",
  isOnline: true,
};

const mockMessages = [
  {
    id: "msg1",
    senderId: "user123",
    text: "こんにちは！お元気ですか？",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
  },
  {
    id: "msg2",
    senderId: "currentUser",
    text: "はい、元気です！ありがとう。プロジェクトの進捗はどうですか？",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5時間前
  },
  {
    id: "msg3",
    senderId: "user123",
    text: "順調に進んでいます。先週のミーティングで話し合った内容を反映させました。",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1時間前
  },
  {
    id: "msg4",
    senderId: "user123",
    text: "新しいデザイン案も作成しました。確認していただけますか？",
    timestamp: new Date(Date.now() - 1000 * 60 * 59), // 59分前
  },
  {
    id: "msg5",
    senderId: "currentUser",
    text: "もちろん！送っていただければ確認します。今日の午後時間ありますか？",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分前
  },
  {
    id: "msg6",
    senderId: "user123",
    text: "はい、15時以降であれば大丈夫です。",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25分前
  },
  {
    id: "msg7",
    senderId: "currentUser",
    text: "了解しました。では15時30分にオンラインミーティングをセットアップします。",
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20分前
  },
  {
    id: "msg8",
    senderId: "user123",
    text: "ありがとうございます。楽しみにしています！",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15分前
  },
];