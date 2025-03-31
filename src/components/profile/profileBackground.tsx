import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Profile } from "@/types";

export function ProfileBackground({
  data,
  isOwnProfile = false,
}: {
  data: Profile;
  isOwnProfile: boolean;
}) {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src={data.background || "/company.png"}
        alt="背景画像"
        fill
        className="h-full w-full object-cover"
      />
      {isOwnProfile && (
        <Link
          href={`/profile/${data.id}/edit`}
          className="absolute top-4 right-4 flex items-center gap-1 bg-white text-primary/90 p-2 rounded-md
              shadow hover:shadow-md transition"
        >
          <Pencil className="h-4 w-4" />
          プロフィールを編集
        </Link>
      )}
    </AspectRatio>
  );
}
