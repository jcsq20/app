export const adjustForTimezone = (date: Date): Date => {
  const timeOffsetInMS: number = date.getTimezoneOffset() * 60000;
  date.setTime(date.getTime() + timeOffsetInMS);
  const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return newDate;
};
