import { Badge } from "@/components/ui/badge";
import type { OutputProfile, OutputCategory } from "@/types";

export function Categories({ data }: { data: OutputProfile }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {data.categories &&
        data.categories.map((cat: OutputCategory, index: number) => (
          <Badge key={index} variant="secondary">
            {cat.name}
          </Badge>
        ))}
    </div>
  );
}
