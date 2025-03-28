import type { Profile } from "@/types";

export function ProfileTextSections({ data } : { data: Profile }) {
  return (
    <div className="pt-2 space-y-5">
      {data.history &&
        <ProfileSection title="沿革" content={data.history} />
      }
      {data.businessDescription &&
        <ProfileSection title="事業について" content={data.businessDescription} />
      }
      {data.message &&
        <ProfileSection title="メッセージ" content={data.message} />
      }
    </div>
  );
}

type ProfileSectionProps = {
  title: string;
  content: string;
};

export function ProfileSection({ title, content }: ProfileSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <p className="text-muted-foreground whitespace-pre-wrap">{content}</p>
    </div>
  );
}
