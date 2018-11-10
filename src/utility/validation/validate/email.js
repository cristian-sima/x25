// @flow
/* eslint-disable require-unicode-regexp*/

export const isValidEmail = (value : string) : boolean => (
  new RegExp("^.+\\@.+\\..+$").test(value)
);
