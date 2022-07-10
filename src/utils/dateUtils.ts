import dayjs from "dayjs";

export function addAndFormatDate(
  date: Date,
  value: number,
  type: dayjs.ManipulateType,
  format: string = "MM/YY",
) {
  return dayjs(date).add(value, type).format(format);
}

export function getNowAddAndFormatDate(
  value: number,
  type: dayjs.ManipulateType,
  format: string = "MM/YY",
) {
  return addAndFormatDate(new Date(), value, type, format);
}

export function isExpired(expirationDate: string) {
  return dayjs(expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"));
}
