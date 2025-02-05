export function getMonths(date: Date) {
  const currentYear = date.getFullYear();
  return [...new Array(12)].map((_, idx) => new Date(currentYear, idx, 1));
}
