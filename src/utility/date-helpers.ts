import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
  format,
  isToday,
  isValid,
  isYesterday,
} from "date-fns";
import { ro } from "date-fns/locale";

const
  daysInWeek = 7,
  secondsInMinute = 60,
  minutesInHour = 60,
  hoursInDay = 24,
  daysInMonth = 30,
  monthsInYear = 12;

/**
 * Shows relative labels for recent dates, full date for older ones.
 * Romanian locale by default.
 */
export const calendarDate = (
  date: Date,
  customFormats?: {
    sameDay?: string;
    lastDay?: string;
    lastWeek?: string;
    sameElse?: string;
  },
): string => {
  if (!isValid(date)) {
    return "";
  }

  const formats = {
    sameDay  : customFormats?.sameDay ?? "'Astăzi,' HH:mm",
    lastDay  : customFormats?.lastDay ?? "'Ieri,' HH:mm",
    lastWeek : customFormats?.lastWeek ?? "eeee HH:mm",
    sameElse : customFormats?.sameElse ?? "d MMMM yyyy",
  };

  if (isToday(date)) {
    return format(date, formats.sameDay, { locale: ro });
  }

  if (isYesterday(date)) {
    return format(date, formats.lastDay, { locale: ro });
  }

  const daysDiff = differenceInDays(new Date(), date);

  if (daysDiff > 0 && daysDiff < daysInWeek) {
    return format(date, formats.lastWeek, { locale: ro });
  }

  return format(date, formats.sameElse, { locale: ro });
};

/**
 * Short Romanian relative time string (e.g. "acum 3z", "în 2h").
 */
export const fromNow = (date: Date): string => {
  if (!isValid(date)) {
    return "";
  }

  const now = new Date(),
    future = date > now,
    seconds = Math.abs(differenceInSeconds(now, date)),
    minutes = Math.abs(differenceInMinutes(now, date)),
    hours = Math.abs(differenceInHours(now, date)),
    days = Math.abs(differenceInDays(now, date)),
    months = Math.abs(differenceInMonths(now, date)),
    years = Math.abs(differenceInYears(now, date));

  let label = "";

  if (seconds < secondsInMinute) {
    label = `${seconds} sec`;
  } else if (minutes < minutesInHour) {
    label = minutes === 1 ? "1 min" : `${minutes}m`;
  } else if (hours < hoursInDay) {
    label = hours === 1 ? "1 oră" : `${hours}h`;
  } else if (days < daysInMonth) {
    label = days === 1 ? "o zi" : `${days}z`;
  } else if (months < monthsInYear) {
    label = months === 1 ? "o lună" : `${months}l`;
  } else {
    label = years === 1 ? "un an" : `${years}a`;
  }

  return future ? `în ${label}` : `acum ${label}`;
};

/**
 * Format a Date with date-fns using Romanian locale.
 */
export const formatDateRo = (date: Date, pattern: string): string => {
  if (!isValid(date)) {
    return "";
  }

  return format(date, pattern, { locale: ro });
};
