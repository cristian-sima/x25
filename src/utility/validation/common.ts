/* eslint-disable no-undefined */

import { words } from "../words";
import { isValidDateStamp, isValidEmail } from "./validate";

import { Checker, CheckerWithOptions, ComponentsOfNumberVerification,
  ComponentsOfStringTenseVerification, ComponentsOfStringVerification, FloatOptions,
  MessageOption, NumberRange, OptionalOption, StringOptions } from "./types";

const
  isInt = (value : number) => (
    !isNaN(value) &&
    parseInt(String(value), 10) === value &&
    !isNaN(parseInt(String(value), 10))
  ),
  validateNumberRange = ({ min, max, value, integer }: NumberRange) => {
    if (typeof value !== "number") {
      return false;
    }

    const
      numeric = Number(value),
      hasMin = typeof min === "number",
      hasMax = typeof max === "number";

    return (
      (typeof value !== "undefined") &&
        (value !== "") &&
        !isNaN(value) &&
        (!integer || (integer && isInt(value))) &&
        (!hasMin || (typeof min === "number" && numeric >= min)) &&
        (!hasMax || (typeof max === "number" && numeric <= max))
    );
  },
  getNumberRangeError = ({ min, max, integer } : ComponentsOfNumberVerification) => {
    const
      minTense = typeof min === "number" ? words.getNumberTense(min) : "",
      maxTense = typeof max === "number" ? words.getNumberTense(max) : "",
      range = (
        (typeof min === "number" && typeof max === "number") ? (
          ` ${words.NumberBetween} ${minTense} ${words.NumberAnd} ${maxTense}`
        ) : (
          typeof max === "number" ? ` ${words.NumberUpTo} ${maxTense}` : (
            typeof min === "number" ? ` ${words.NumberGreaterThan} ${minTense}` : ""
          )
        )
      );

    return `${words.NumberMustBe} ${integer ? words.NumberInteger : words.NumberFloat} ${range}`;
  },
  getStringTense = ({ min, max, what } : ComponentsOfStringTenseVerification) => {
    const
      maxTense = max ? words.getNumberTense(max) : "",
      minTense = min ? words.getNumberTense(min) : "",
      isBetween = (typeof max === "number" && typeof min === "number"),
      rangeError = isBetween ? `${words.NumberBetween} ${minTense} ${words.NumberAnd} ${maxTense}` : (
        typeof max === "number" ? `${words.NumberUpTo} ${maxTense}` : (
          typeof min === "number" ? `${words.NumberGreaterThan} ${minTense}` : ""
        )
      );

    return `${what} ${words.Has} ${rangeError} ${words.Chars}`;
  },
  validateStringRange = ({ min, max, value } : ComponentsOfStringVerification) => {
    if (typeof value !== "string") {
      return false;
    }

    const
      length = typeof value === "undefined" ? 0 : value.length,
      hasMin = typeof min === "number",
      hasMax = typeof max === "number";

    return (
      (!hasMin || (typeof min === "number" && length >= min)) &&
                      (!hasMax || (typeof max === "number" && length <= max))
    );
  };

export const
  validateEmail : CheckerWithOptions<OptionalOption> = ({ optional }) => (value : string) => {
    const
      notValid = (
        optional && (
          typeof value !== "undefined" && value !== "" && !isValidEmail(value)
        )
      ) || (
        !optional && (
          typeof value === "undefined" || !isValidEmail(value)
        )
      ),
      error = notValid ? words.EnterValidEmail : undefined;

    return error;
  },
  validateOptionalDate : Checker = (value : string) => {
    const
      notValid = !(
        typeof value === "undefined" || value === "" || value === null || (
          isValidDateStamp(value)
        )
      ),
      error = notValid ? words.EnterValidDate : undefined;

    return error;
  },
  validateDate : Checker = (value : string) => {
    const
      notValid = !(
        (typeof value !== "undefined") && isValidDateStamp(value)
      ),
      error = notValid ? words.EnterValidDate : undefined;

    return error;
  },
  validateFloat : CheckerWithOptions<FloatOptions> = (props) => (value) => {
    const { min, max, optional, integer } = props,

      whenOptional = optional && !(
        typeof value === "undefined" || value === null || (
          validateNumberRange({
            min,
            max,
            value,
            integer,
          })
        )
      ),
      whenRequired = !optional && !(
        (typeof value !== "undefined" && value !== null) && validateNumberRange({
          min,
          max,
          value,
          integer,
        })
      ),
      notValid = whenOptional || whenRequired,
      error = notValid ? getNumberRangeError({
        min,
        max,
        integer,
      }) : "";

    return error;
  },
  validateString : CheckerWithOptions<StringOptions> = (props) => (value) => {
    const { what = words.TheField, min, max, optional } = props,

      whenOptional = optional && !(
        typeof value === "undefined" || value === null || (
          validateStringRange({
            min,
            max,
            value,
          })
        )
      ),
      whenRequired = !optional && !(
        (typeof value !== "undefined" && value !== null) && validateStringRange({
          min,
          max,
          value,
        })
      ),
      notValid = whenOptional || whenRequired,
      error = notValid ? getStringTense({
        min,
        max,
        what,
      }) : "";

    return error;
  },
  validateSelect : CheckerWithOptions<MessageOption> = ({ message }) => (value) => {
    const
      notValid = (
        (typeof value === "undefined") || value === null || value === ""
      ),
      error = notValid ? (typeof message === "undefined" ? words.PleaseSelect : message) : undefined;

    return error;
  },
  validateID : CheckerWithOptions<MessageOption> = ({ message }) => (value) => {
    const
      notValid = !(
        typeof value === "number" && !isNaN(value)
      ),
      error = notValid ? (typeof message === "undefined" ? words.PleaseSelect : message) : undefined;

    return error;
  },
  validateCaptchaSolution : Checker = (value : string) => {
    const
      pattern = /^\d{6}$/u,
      notValid = (
        typeof value !== "undefined" &&
                                                      !pattern.test(value)
      ),
      error = notValid ? words.Has6Digits : undefined;

    return error;
  },
  validateResetToken : Checker = (value : string) => {
    const
      tokenSize = 64,
      notValid = (
        typeof value === "undefined" ||
                                                        String(value).length !== tokenSize
      ),
      error = notValid ? words.CodeNotValid : undefined;

    return error;
  },
  validateHumanName : Checker = validateString({
    min : 3,
    max : 40,
  }),
  validatePassword : Checker = validateString({
    min : 6,
    max : 25,
  });
