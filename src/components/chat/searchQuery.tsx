'use client';

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useChatRooms } from "@/hooks";

export function SearchQuery() {
  const { searchQuery, setSearchQuery } = useChatRooms();

  return (
    <div className="sticky top-0 z-10 bg-background pt-4 pb-2 px-4">
      <h1 className="text-2xl font-bold mb-4">チャット</h1>
      <div className="relative mb-2">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="チャットを検索"
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
