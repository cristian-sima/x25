export * from "./calendar";
export * from "./date";
export * from "./hooks";
export * from "./numbers";
export * from "./numeric";
export * from "./others";
export * from "./strings";
export * from "./validation";
export * from "./words";

import { FORM_ERROR } from "final-form";

export const
  formError = (message : string) => ({
    [FORM_ERROR]: message,
  }),
  toNumeric = (raw : any) => Number(String(raw));
