import type { OutputProfile } from "@/types";

export function CompanyName({ data }: { data: OutputProfile }) {
  return (
    <h1 className="relative z-10 p-3 text-2xl font-bold sm:mt-14 lg:mt-20">
      {data.companyName}
      <span className="block text-sm font-medium mt-2">
        {data.contactName}
      </span>
    </h1>
  );
}
