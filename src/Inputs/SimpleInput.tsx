export type SimpleInputPropTypes = {
  readonly disabled?: boolean;
  readonly autoFocus?: boolean;
  readonly customClass?: any;
  readonly input: any;
  readonly theType?: "input" | "password";
  readonly tabIndex?: string;
  autoComplete?: string;
  readonly label?: string;
  readonly inputRef?: (callback: (node: any) => void) => void;

  readonly meta: {
    submitting: boolean;
    touched: boolean;
    error?: string;
  };
  readonly placeholder?: string;
};
import classnames from "classnames";
import React from "react";

export const SimpleInput = ({
  customClass, input, label, autoFocus, tabIndex, placeholder, theType, inputRef,
  autoComplete, disabled,
  meta: { submitting, touched, error },
}: SimpleInputPropTypes) => (
  <input
    {...input}
    aria-label={label}
    autoComplete={autoComplete}
    autoFocus={autoFocus}
    className={classnames(`form-control ${customClass || ""}`, {
      "is-invalid": touched && error,
    })} disabled={submitting || disabled}
    id={input.name}
    placeholder={placeholder || label}
    ref={inputRef ? inputRef : null}
    tabIndex={tabIndex}
    type={theType} />
);
