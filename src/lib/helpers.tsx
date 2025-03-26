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