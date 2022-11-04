import { words } from "../words";
import { validateFloat } from "./common";

export const
  validateDay = validateFloat({
    min     : 1,
    max     : 31,
    integer : true,
  }),
  validateChecked = (value : string) => {
    const
      notValid = (
        typeof value !== "boolean" || value !== true
      );

    // eslint-disable-next-line no-undefined
    return notValid ? words.MustAgree : undefined;
  };
