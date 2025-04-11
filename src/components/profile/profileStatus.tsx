import {
  Building2,
  Briefcase,
  // MapPin,
  Landmark } from "lucide-react";
import { formatAmount } from "@/lib/helpers"; // 資本金のフォーマット関数
import type { OutputProfile } from "@/types";
import { toEmployeeCountEnum } from "@/lib/constants";

export function ProfileStatus({ data }: { data: OutputProfile }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      {data.establishmentYear && (
        <ProfileStatItem
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          text={`設立: ${data.establishmentYear}年`}
        />
      )}
      {data.employeeCount && (
        <ProfileStatItem
          icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
          text={`従業員数: ${toEmployeeCountEnum(data.employeeCount)}`}
        />
      )}
      {/* {data.location && (
        <ProfileStatItem
          icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
          text={`所在地: ${data.location}`}
        />
      )} */}
      {data.capital && (
        <ProfileStatItem
          icon={<Landmark className="h-4 w-4 text-muted-foreground" />}
          text={`資本金: ${formatAmount(data.capital || 0)}`}
        />
      )}
    </div>
  );
}

type ProfileStatItemProps = {
  icon: React.ReactElement;
  text: string;
};

export function ProfileStatItem({ icon, text }: ProfileStatItemProps) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
  );
}
