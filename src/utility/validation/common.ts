type ValidatorResult = {
  notValid: boolean;
  error: null | string;
};
type ValidateStringOptions = {
  what?: string;
  min?: number;
  max?: number;
  optional?: boolean;
};
type ValidateFloatOptions = {
  min?: number;
  max?: number;
  optional?: boolean;
  integer?: boolean;
};
type AllOptions = ValidateFloatOptions | ValidateStringOptions;
type Field = {
  field: string;
  options: AllOptions;
};
type Fields = Array<Field>;
type Validator = (value?: string) => ValidatorResult;
type Checker = (options: any) => Validator;
type ValidateFields = (fields: Fields, checker: Checker) => any;

type NumberRange = {
  max: number;
  min : number;
  value: string;
  integer: boolean;
}

import { words } from "../words";
import {
  isValidDateStamp,
  isValidEmail,
} from "./validate";


export const validateEmail = ({ optional } : { optional : boolean }) => (value : string) => {
  const
    notValid = (
      optional && (
        typeof value !== "undefined" &&
        value !== "" &&
        !isValidEmail(value)
      )
    ) || (
      !optional && (
        typeof value === "undefined" ||
        !isValidEmail(value)
      )
    ),
    error = notValid ? words.EnterValidEmail : null;

  return {
    notValid,
    error,
  };
};


export const validateOptionalDate = (value : string) => {
  const
    notValid = !(
      typeof value === "undefined" || value === "" || value === null || (
        isValidDateStamp(value)
      )
    ),
    error = notValid ? words.EnterValidDate : null;

  return {
    notValid,
    error,
  };
};

export const validateDate = (value : string) => {
  const
    notValid = !(
      (typeof value !== "undefined") && isValidDateStamp(value)
    ),
    error = notValid ? words.EnterValidDate : null;

  return {
    notValid,
    error,
  };
};

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

  getNumberRangeError = ({ min, max, integer } : { min : number, max :number, integer: number }) => {

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
  };

export const validateFloat : Checker = (props) => (value) => {
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

  return {
    notValid,
    error,
  };
};

const getStringTense = ({ min, max, what } : { min: number, max: number, what: string}) => {
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

  validateStringRange = ({ min, max, value } : { min : number, max: string, value : string}) => {
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


export const validateString : Checker = (props) => (value) => {
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

  return {
    notValid,
    error,
  };
};

export const validateSelect = (message? : string) => (value : string) => {
  const
    notValid = (
      (typeof value === "undefined") || value === null || value === ""
    ),
    error = notValid ? (typeof message === "undefined" ? words.PleaseSelect : message) : null;

  return {
    notValid,
    error,
  };
};

export const validateID = (message? : string) => (value : string) => {
  const
    notValid = !(
      typeof value === "number" && !isNaN(value)
    ),
    error = notValid ? (typeof message === "undefined" ? words.PleaseSelect : message) : null;

  return {
    notValid,
    error,
  };
};

export const validateCaptchaSolution = (value : string) => {
  const
    pattern = /^\d{6}$/u,
    notValid = (
      typeof value !== "undefined" &&
      !pattern.test(value)
    ),
    error = notValid ? words.Has6Digits : null;

  return {
    notValid,
    error,
  };
};

export const validateResetToken = (value : string) => {
  const
    tokenSize = 64,
    notValid = (
      typeof value === "undefined" ||
      String(value).length !== tokenSize
    ),
    error = notValid ? words.CodeNotValid : null;

  return {
    notValid,
    error,
  };
};

export const validateHumanName = validateString({
  min : 3,
  max : 40,
});

export const validatePassword = validateString({
  min : 6,
  max : 25,
});

export const validateFields : ValidateFields = (fields, checker) => (
  fields.reduce((accumulator, { field, options }) => ({
    ...accumulator,

    [field]: checker(options),
  }), {})
);
