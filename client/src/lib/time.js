export function formatTimeAgo(isoString) {
  if (!isoString) {
    return "";
  }

  const units = [
    ["year", 365 * 24 * 3600],
    ["month", 30 * 24 * 3600],
    ["day", 24 * 3600],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [unit, secs] of units) {
    const val = Math.floor(Math.floor((Date.now() - new Date(isoString).getTime()) / 1000) / secs);
    if (val >= 1) {
      return `${val} ${unit}${val > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}
