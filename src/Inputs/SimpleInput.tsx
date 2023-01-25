export type SimpleInputPropTypes = {
  readonly autoFocus?: boolean;
  readonly customClass?: any;
  readonly input: any;
  readonly theType?: "input" | "password";
  readonly tabIndex?: string;
  readonly label?: string;
  readonly inputRef?: (callback: (node: any) => void) => void;

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
  customClass, input, label, autoFocus, tabIndex, placeholder, theType, inputRef,
  meta: { submitting, touched, error },
}: SimpleInputPropTypes) => (
  <input
    {...input}
    aria-label={label}
    autoComplete={input.name}
    autoFocus={autoFocus}
    className={classnames(`form-control ${customClass || ""}`, {
      "is-invalid": touched && error,
    })} disabled={submitting}
    id={input.name}
    placeholder={placeholder || label}
    ref={inputRef ? inputRef : null}
    tabIndex={tabIndex}
    type={theType} />
);
