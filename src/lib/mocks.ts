
import type { Profile } from "@/types";

export function getAccount(account_id: string): Profile {
  return {
    user_id: account_id,
    companyName: "テクノソリューション株式会社",
    representativeName: "山田 太郎",
    icon: "/company-image.png",
    background: "/company.png",
    industry: ["ITコンサルティング", "システム開発", "クラウドサービス"],
    businessDescription:
      "当社は創業以来20年間、企業のデジタルトランスフォーメーションを支援しており、最新技術を活用したソリューションでクライアントのビジネス課題を解決しています。",
    message:
      "テクノソリューション株式会社は、お客様のビジネス課題に対して最適なITソリューションを提供することで、企業価値向上に貢献します。",
    history:
      "2003年に設立。創業当初は小規模なシステム開発会社としてスタートし、以降数々のプロジェクトを成功に導き、現在では国内外の大手企業とも取引があります。",
    employeeCount: "50～99人",
    foundedYear: 2003,
    capital: 50000000,
    location: "東京都港区",
    links: [
      { label: "corporateSite", url: "https://www.technosolutions.co.jp" },
      { label: "facebook", url: "https://www.facebook.com/technosolutions" },
      {
        label: "linkedIn",
        url: "https://www.linkedin.com/company/technosolutions",
      },
    ],
  };
}