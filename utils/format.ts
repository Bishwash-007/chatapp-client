export const formatNumber = (num?: number) => {
  if (num === undefined || num === null) return "0";
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
};

export function formatTimestamp(ts: number, locale = "en-US"): string {
  const date = new Date(ts);
  return (
    date.toLocaleDateString(locale, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " " +
    date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
    })
  );
}

// Example usage:
const ts = 1751013627174.8745;
console.log(formatTimestamp(ts));
