// import { EmployeeCount } from "@prisma/client";

interface Constants {
  employeeCount: EmployeeCount[];
  linkLabel: string[];
}

export const constants: Constants = {
  employeeCount: [
    "ONE_TO_NINE",
    "TEN_TO_TWENTY_NINE",
    "THIRTY_TO_FORTY_NINE",
    "FIFTY_TO_NINETY_NINE",
    "ONE_HUNDRED_TO_199",
    "TWO_HUNDRED_TO_299",
    "THREE_HUNDRED_TO_499",
    "FIVE_HUNDRED_TO_999",
    "ONE_THOUSAND_TO_1999",
    "OVER_2000",
  ],
  linkLabel: [
    "corporateSite",
    "facebook",
    "x",
    "instagram",
    "youTube",
    "linkedIn",
    "others",
  ],
};

type EmployeeCount =
  | "ONE_TO_NINE"
  | "TEN_TO_TWENTY_NINE"
  | "THIRTY_TO_FORTY_NINE"
  | "FIFTY_TO_NINETY_NINE"
  | "ONE_HUNDRED_TO_199"
  | "TWO_HUNDRED_TO_299"
  | "THREE_HUNDRED_TO_499"
  | "FIVE_HUNDRED_TO_999"
  | "ONE_THOUSAND_TO_1999"
  | "OVER_2000";

// Enumの値を人間が読みやすい形にする
export const toEmployeeCountEnum = (value: EmployeeCount): string | null => {
  if (!value) return null;

  const map: Record<EmployeeCount, string> = {
    ONE_TO_NINE: "1～9人",
    TEN_TO_TWENTY_NINE: "10～29人",
    THIRTY_TO_FORTY_NINE: "30～49人",
    FIFTY_TO_NINETY_NINE: "50～99人",
    ONE_HUNDRED_TO_199: "100～199人",
    TWO_HUNDRED_TO_299: "200～299人",
    THREE_HUNDRED_TO_499: "300～499人",
    FIVE_HUNDRED_TO_999: "500～999人",
    ONE_THOUSAND_TO_1999: "1000～1999人",
    OVER_2000: "2000人以上",
  };

  return map[value];
};
