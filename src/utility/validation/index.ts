import { Checkers, Errors } from "./types";

export * from "./common";
export * from "./specific";
export * from "./validate";


export const extractErrorsFromCheckers = (checkers: Checkers) => (values: any) => {
  const errors : Errors = {};

  for (const field in checkers) {
    // eslint-disable-next-line prefer-object-has-own
    if (Object.prototype.hasOwnProperty.call(checkers, field) && typeof field === "string") {
      const checker = checkers[field],
        error = checker(values[field], values, checkers);

      if (typeof error !== "undefined") {
        errors[field] = error;
      }
    }
  }

  return errors;
};
