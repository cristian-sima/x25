/* eslint-disable no-magic-numbers */

const numberFormat: any = new Intl.NumberFormat("ro", {
  minimumFractionDigits: 2,
}),
  plainNumberFormat: any = new Intl.NumberFormat("ro"),

  replaceCharInString = ({
    word,
    oldChar,
    newChar,
  }: {
  word: string;
  oldChar: string;
  newChar: string;
}): string => {
    const regex = new RegExp(oldChar, "gu");

    return word.replace(regex, newChar);
  };

// 127.99 ----> 127,99
// 0 ----> ""
export const
  formatZeroValue = (word: any, optional?: boolean): string => (
    optional && word === "" ? "" : replaceCharInString({
      word    : String(word),
      oldChar : "\\.",
      newChar : ",",
    })
  ),
  formatNumber = (word: any): string => replaceCharInString({
    word    : String(word),
    oldChar : "\\.",
    newChar : ",",
  }),
  normalizeNumber = (word: any): string => replaceCharInString({
    word    : String(word),
    oldChar : ",",
    newChar : ".",
  }),
  numberToLocale = (value: number): string => numberFormat.format(value),
  plainNumberToLocale = (value: number): string => plainNumberFormat.format(value),
  numericBehavior = {
    normalize : normalizeNumber,
    format    : formatNumber,
  },
  tryToParseNumber = (raw: string) => {
    const result = Number(raw);

    if (!isNaN(result) && raw !== "") {
      return result;
    }

    return raw;
  },
  numberToLocaleHideBlank = (raw: any) => (
    typeof raw === "number" && raw !== 0 ? numberToLocale(raw) : ""
  ),
  plainNumberToLocaleHideZero = (raw: any) => (
    typeof raw === "number" && raw !== 0 ? plainNumberToLocale(raw) : ""
  );
