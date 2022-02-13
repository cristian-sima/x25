export * from "./common";
export * from "./specific";
export * from "./validate";
import { words } from "../words";

type ProcessError = (
  data1 : { error : any, isArray : any, _error : any, arrayErrors : any },
  data2 : { field : any, errors : any }
) => void

const processErrors : ProcessError = ({ error, isArray, _error, arrayErrors }, { field, errors }) => {
  if (isArray) {
    if (arrayErrors) {
      errors[field] = arrayErrors;
    } else {
      errors[field] = {
        _error,
      };
    }
  } else {
    errors[field] = error;
  }
};

export const extractErrorsFromCheckers = (checkers: any) => (values: any) => {
  const errors = {};

  for (const field in checkers) {
    // @ts-expect-error It works
    if (Object.hasOwn(checkers, field)) {
      const checker = checkers[field],
        result = checker(values.get(field)),
        {
          notValid,
        } = result;

      if (notValid) {
        processErrors(result, {
          field,
          errors,
        });
      }
    }
  }

  return errors;
};
export const performValidateRows = (items: any, checkers: any) => {
  const notValid = typeof items === "undefined" || items.size === 0;

  if (notValid) {
    return {
      notValid,
      _error  : words.AddARow,
      isArray : true,
    };
  }

  const arrayErrors = items.reduce((previous: any, item: any, key: string | number) => {
    previous[key] = extractErrorsFromCheckers(checkers)(item);
    return previous;
  }, []);

  return {
    notValid : true,
    arrayErrors,
    isArray  : true,
  };
};
