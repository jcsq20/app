export function findYearIndex(date: Date): number {
  const length = 24;
  const currentYear = date.getFullYear();
  const index = Math.ceil(currentYear / length);
  return index;
}
