"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useChatConversion } from "@/hooks";
import { isNewDay, formatTimestamp } from "@/lib/helpers";


export function ChatRoom({ matchId }: { matchId: string }) {
  const {
    partner,
    messages,
    // setMessages,
    newMessage,
    setNewMessage,
    messagesEndRef,
    handleKeyPress,
    handleSendMessage
  } = useChatConversion(matchId);

  return (
    <div className="flex flex-col h-screen mx-auto">
      {/* ヘッダー */}
      <header className="flex items-center p-4 border-b">
        <Link href="/chat" className="mr-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={partner.avatar} alt={partner.name} />
          <AvatarFallback>{partner.name.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="font-medium">{partner.name}</h2>
          <p className="text-xs text-muted-foreground">
            {partner.isOnline ? "オンライン" : "オフライン"}
          </p>
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      {/* メッセージエリア */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isUser = message.senderId === "currentUser";
            const prevMessage = index > 0 ? messages[index - 1] : undefined;
            const showDateSeparator = isNewDay(
              message.timestamp,
              prevMessage?.timestamp
            );

            return (
              <div key={message.id}>
                {showDateSeparator && (
                  <div className="flex justify-center my-4">
                    <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                      {message.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                )}

                <div
                  className={`flex ${
                    isUser ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div className="flex flex-col max-w-[75%]">
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isUser
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                    </div>
                    <span
                      className={`text-xs text-muted-foreground mt-1 ${
                        isUser ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* メッセージ入力エリア */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="メッセージを入力..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            disabled={newMessage.trim() === ""}
            className="h-10 w-10 rounded-full"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
