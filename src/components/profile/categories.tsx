import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/types";

export function Categories({ data }: { data: Profile }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {data.industry &&
        data.industry.map((ind, index) => (
          <Badge key={index} variant="secondary">
            {ind}
          </Badge>
        ))}
    </div>
  );
}
