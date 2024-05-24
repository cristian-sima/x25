
import classnames from "classnames";
import React from "react";
import { MetaProps } from "src/types";

export type SimpleInputPropTypes = {
  readonly autoComplete?: string;
  readonly autoFocus?: boolean;
  readonly customClass?: any;
  readonly disabled?: boolean;
  readonly field: any;
  readonly label?: string;
  readonly meta: MetaProps;
  readonly placeholder?: string;
  readonly tabIndex?: string;
  readonly theType?: "input" | "password";
  readonly inputRef?: (callback: (node: any) => void) => void;
};

export const SimpleInput = (props : SimpleInputPropTypes) => {
  const {
    customClass, field = {}, label, autoFocus, tabIndex, placeholder, theType, inputRef,
    autoComplete, disabled,
    meta: { submitting, touched, error } = {},
  } = props;

  return (
    <input
      {...field}
      aria-label={label}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      className={classnames(`form-control ${customClass || ""}`, {
        "is-invalid": touched && error,
      })} disabled={submitting || disabled}
      id={field.name}
      placeholder={placeholder || label}
      ref={inputRef ? inputRef : null}
      tabIndex={tabIndex}
      type={theType} />
  );
};
