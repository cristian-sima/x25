import moment from "moment";
import { toTitle } from "./strings";

const now = new Date(),
  currentMonth = now.getMonth(),
  currentYear = now.getFullYear();

export const
  calendar = {
    month        : currentMonth,
    year         : currentYear,
    currentMonth : {
      firstDay : new Date(Date.UTC(currentYear, currentMonth, 1)).toISOString(),
      lastDay  : new Date(Date.UTC(currentYear, currentMonth + 1, 0)).toISOString(),
    },
  },
  newDate = (year: any, month: any, day: any = 1) => (
    new Date(Date.UTC(Number(year), Number(month), day))
  ),
  monthYearToDate = (data: { Year: string; Month: string;}) => ({ ...data,
    Date: newDate(data.Year, data.Month),
  }),
  getMonthName = (data: Date) => toTitle(moment.months(data.getMonth()));
