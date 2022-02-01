import { format, addMonths as addMonthsFns } from "date-fns";
import esLocale from "date-fns/locale/es";

type ReceivedDate = string | number | Date;

const getValidDate = (date: ReceivedDate) => {
  if (typeof date === "string") {
    let validDate = date.split("T")[0];
    validDate = validDate.replace(/-/g, "/");

    return new Date(validDate);
  }

  return date;
};

export const addMonths = (date: ReceivedDate, months: number) => {
  const validDate = getValidDate(date);

  return addMonthsFns(validDate, months);
};

export const formatDateToMonthAndYear = (date: ReceivedDate) => {
  const validDate = getValidDate(date);

  return format(validDate, "MMMM - yyyy", {
    locale: esLocale,
  });
};

export const formateDateToFullDate = (date: ReceivedDate) => {
  const validDate = getValidDate(date);

  return format(validDate, "dd/MM/yyyy", {
    locale: esLocale,
  });
};
