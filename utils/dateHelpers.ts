import { format } from "date-fns";
import esLocale from "date-fns/locale/es";

type ReceivedDate = string | number | Date;

const getValidDate = (date: ReceivedDate) => {
  return typeof date === "string" ? new Date(date) : date;
};

export const formatDateToMonthAndYear = (date: ReceivedDate) => {
  let validDate = getValidDate(date);
  console.log("Received date: ", date);
  console.log("Valid date: ", validDate);

  return format(validDate, "MMMM - yyyy", {
    locale: esLocale,
  });
};

export const formateDateToFullDate = (date: ReceivedDate) => {
  let validDate = getValidDate(date);

  return format(validDate, "dd/MM/yyyy", {
    locale: esLocale,
  });
};
