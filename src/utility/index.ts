export * from "./calendar";
export * from "./date";
export * from "./normalize";
export * from "./numbers";
export * from "./numeric";
export * from "./others";
export * from "./strings";
export * from "./mql";
export * from "./validation";
export * from "./words";
export * from "./hooks";

import { FORM_ERROR } from "final-form";

export const
  formError = (message : string) => ({
    [FORM_ERROR]: message,
  }),
  toNumeric = (raw : any) => Number(String(raw));
