import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatchingPage() {
  return (
    <section className="max-w-7xl mx-auto p-3">
      <Tabs defaultValue="recommend" className="bg-gray-50">
        <TabsList className="w-full bg-gray-50">
          <TabsTrigger value="recommend">おすすめ</TabsTrigger>
          <TabsTrigger value="offer">オファー</TabsTrigger>
          <TabsTrigger value="pending">承認待ち</TabsTrigger>
        </TabsList>
        <TabsContent value="recommend">
          おすすめのコンテンツをここに表示します。
        </TabsContent>
        <TabsContent value="offer">
          オファーの詳細をここに表示します。
        </TabsContent>
        <TabsContent value="pending">
          承認待ちの項目をここに表示します。
        </TabsContent>
      </Tabs>
    </section>
  );
}
