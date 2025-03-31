import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Profile } from "@/types";

export function ProfileAvatar({ data }: { data: Profile }) {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white bg-white">
        <AvatarImage
          src={data.icon || "company-image.png"}
          alt={data.companyName}
        />
        <AvatarFallback className="text-2xl">
          {data.companyName}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
