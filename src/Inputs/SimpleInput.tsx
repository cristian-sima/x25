export type SimpleInputPropTypes = {
  readonly customClass?: any;
  readonly input: any;
  readonly tabIndex?: string;
  readonly label?: string;
  readonly meta: {
    submitting: boolean;
    touched: boolean;
    error?: string;
  };
  readonly placeholder?: string;
};
import React from "react";
import classnames from "classnames";

export const SimpleInput = ({
  customClass,
  input,
  label,
  tabIndex,
  meta: {
    submitting,
    touched,
    error,
  },
  placeholder,
}: SimpleInputPropTypes) => (<input
  {...input} aria-label={label} autoComplete={input.name} className={classnames(`form-control ${customClass || ""}`, {
    "is-invalid": touched && error,
  })} disabled={submitting} id={input.name} placeholder={placeholder || label} tabIndex={tabIndex} type="text" />);
