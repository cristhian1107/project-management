export function subtractDays (dates, days) {
  return dates.map(date => {
    const baseDate = new Date();
    baseDate.setDate(date.getDate() - days);
    return baseDate;
  });
}
