type InputTemplatePropTypes = {
  readonly disabled?: boolean;
  readonly autoFocus?: boolean;
  readonly input: any;
  readonly label: string;
  readonly placeholder: string;
  readonly theType?: "input" | "password";
  readonly divClass?: string;
  readonly inputClass?: string;
  readonly meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
  readonly autoComplete?: string;
  readonly tabIndex?: string;
  readonly left?: string;
  readonly right?: string;
  readonly inputRef?: (callback: (node: any) => void) => void;
};

import classnames from "classnames";
import React from "react";

export const InputTemplate = ({
  input, theType, label, inputRef, autoFocus, inputClass, divClass,
  placeholder, left, tabIndex, right, autoComplete, disabled,
  meta: { submitting, touched, error },
}: InputTemplatePropTypes) => {
  const
    warningClass = `${touched && error ? " is-invalid" : ""}`,
    customClass = `${inputClass ? ` ${inputClass}` : ""}`,
    classForInput = `form-control ${warningClass}${customClass}`,
    classForDiv = `form-group row mt-md-2 ${divClass ? divClass : ""}`;

  return (
    <div className={classnames(`${classForDiv} d-flex`, {
      "is-invalid": touched && error,
    })}>
      <label
        className={`${left ? left : "col-md-4 text-md-end"} form-control-label align-self-center`}
        htmlFor={input.name}>
        {label}
      </label>
      <div className={`${right ? right : "col-md-8"} align-self-center`}>
        <input
          {...input}
          aria-label={label}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={classForInput}
          disabled={submitting || disabled}
          id={input.name} placeholder={placeholder}
          ref={inputRef ? inputRef : null}
          tabIndex={tabIndex}
          type={theType}
        />
        <div className="invalid-feedback">
          {touched && error ? (
            <span>
              {error}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
