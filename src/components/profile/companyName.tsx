import type { Profile } from "@/types";

export function CompanyName({ data }: { data: Profile }) {
  return (
    <h1 className="relative z-10 p-3 text-2xl font-bold sm:mt-14 lg:mt-20">
      {data.companyName}
      <span className="block text-sm font-medium mt-2">
        {data.representativeName}
      </span>
    </h1>
  );
}
