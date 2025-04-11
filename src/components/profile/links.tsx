import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Home,
  Newspaper,
  Globe,
} from "lucide-react";
import Link from "next/link";
import type { OutputLink } from "@/types";

export function Links(links?: { links: OutputLink[] }) {
  // 棚卸し
  const data = links?.links;

  // リンクが一つもないなら何も表示しない。
  if (!data || data.length === 0) return <></>;

  // アイコンのマッピング リンクの種類によってアイコンを変更する
  const getIconForLabel = (label: string) => {
    switch (label.toLowerCase()) {
      case "facebook":
        return Facebook;
      case "x":
        return Twitter;
      case "linkedin":
        return Linkedin;
      case "instagram":
        return Instagram;
      case "corporatesite":
        return Home;
      case "others":
        return Newspaper;
      default:
        return Globe;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {data.map((link, index) => {
        // リンクの種類によってアイコンを変更
        const IconComponent = getIconForLabel(link.label);

        return (
          <Link
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary underline hover:no-underline"
          >
            <div className="min-h-5 min-w-5 h-5 w-5">
              <IconComponent className="w-full h-full" />
            </div>
            <span className="break-all">
              {link.url.replace(/^https?:\/\//, "")}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
