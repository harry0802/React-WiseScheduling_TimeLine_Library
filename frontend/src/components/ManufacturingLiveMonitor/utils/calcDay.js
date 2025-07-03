import dayjs from "dayjs";

// 是否過期 ?
const isExpired = (date) => {
  const today = dayjs();
  const itemDate = dayjs(date);
  return itemDate.isBefore(today);
};
// 是否即將過期 ? 在天數內
const isExpiredSoon = (date, days) => {
  const today = dayjs();
  const itemDate = dayjs(date);
  return itemDate.isAfter(today) && itemDate.isBefore(today.add(days, "day"));
};

export { isExpired, isExpiredSoon };
