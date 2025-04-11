import type { OutputProfile } from "@/types";

export function ProfileTextSections({
  data,
  isSummalized = false,
}: {
  data: OutputProfile;
  isSummalized: boolean;
}) {
  return (
    <div className="pt-2 space-y-5">
      {isSummalized && (
        <>
          <ProfileSection
            title="事業について"
            content={data.businessDescription || ""}
          />
          <ProfileSection title="メッセージ" content={data.message || ""} />
        </>
      )}
      {!isSummalized && (
        <>
          <ProfileSection title="沿革" content={data.companyHistory || ""} />
          <ProfileSection
            title="事業について"
            content={data.businessDescription || ""}
          />
          <ProfileSection title="メッセージ" content={data.message || ""} />
        </>
      )}
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
