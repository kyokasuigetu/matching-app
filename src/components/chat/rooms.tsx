"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useChatRooms } from "@/hooks";

export function Rooms() {
  const { filteredChatRooms } = useChatRooms();

  return (
    <div className="flex-1 overflow-auto">
      {filteredChatRooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <p>チャットが見つかりませんでした</p>
        </div>
      ) : (
        <ul className="divide-y">
          {filteredChatRooms.map((room) => (
            <li key={room.id}>
              <Link href={`/chat/${room.id}`}>
                <div className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={room.avatar} alt={room.name} />
                      <AvatarFallback>{room.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {room.unread && (
                      <Badge className="absolute top-0 right-0 h-3 w-3 p-0 bg-primary"></Badge>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium truncate">{room.name}</h3>
                      <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                        {room.timestamp}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        room.unread ? "font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {room.lastMessage}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
