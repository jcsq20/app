export function getNearbyYears(index: number): Date[] {
  const length = 24;
  const lastYear = new Date(
    new Date().setFullYear(index * length)
  ).getFullYear();
  const dates = Array.from({ length }, (_x, i) => {
    const date = new Date();
    date.setFullYear(lastYear - i);
    return date;
  });
  return dates.reverse();
}
