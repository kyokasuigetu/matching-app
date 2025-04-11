import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { OutputProfile } from "@/types";

export function ProfileAvatar({ data }: { data: OutputProfile }) {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white bg-white">
        <AvatarImage
          src={data.iconUrl || "company-image.png"}
          alt={data.companyName || "Company Avatar"}
        />
        <AvatarFallback className="text-2xl text-center">
          {data.companyName}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
