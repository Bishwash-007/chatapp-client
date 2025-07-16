import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend Day.js with relativeTime plugin
dayjs.extend(relativeTime);

/**
 * Converts a timestamp (number | Date | ISO string) into a relative time string.
 * @param input - timestamp in ms, a Date object, or ISO date string
 * @returns e.g. "5 minutes ago" or "in 2 days"
 */
export function timeAgo(input: number | Date | string): string {
  const date = typeof input === "number" ? dayjs(input) : dayjs(input);
  return date.fromNow();
}

/**
 * Optionally, get "relative to now" wording in the opposite direction.
 * @param input - same as timeAgo
 * @returns e.g. "in 5 hours" or "2 hours ago"
 */
export function timeTo(input: number | Date | string): string {
  const date = typeof input === "number" ? dayjs(input) : dayjs(input);
  return date.toNow();
}