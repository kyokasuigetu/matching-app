// タイムスタンプをフォーマット
export const formatTimestamp = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 日付が変わったかチェック
export const isNewDay = (current: Date, previous?: Date) => {
  if (!previous) return true;
  return current.toDateString() !== previous.toDateString();
};

// 資本金など、大きな金額を〇,〇〇〇万円,〇,〇〇〇億円などにフォーマット
export const formatAmount = (amount: number) => {
  // 1万未満
  if (amount < 10000) return amount.toLocaleString();

  // 1万円以上
  if (amount < 100000000) return `${Math.floor(amount / 10000)}万円`;

  // 1億円以上
  return `${Math.floor(amount / 100000000)}億円`;
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}