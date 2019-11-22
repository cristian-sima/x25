// @flow

export const isValidEmail = (value : string) : boolean => (
  new RegExp(/^.+@.+..+$/giu, "u").test(value)
);
