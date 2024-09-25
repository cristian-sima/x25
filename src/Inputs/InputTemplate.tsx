

import classnames from "classnames";
import React from "react";
import { MetaProps } from "src/types";

type InputTemplatePropTypes = {
  readonly autoComplete?: string;
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly divClass?: string;
  readonly input: any;
  readonly inputClass?: string;
  readonly label: string;
  readonly left?: string;
  readonly meta: MetaProps;
  readonly placeholder: string;
  readonly right?: string;
  readonly tabIndex?: string;
  readonly theType?: "input" | "password";
  readonly inputRef?: (callback: (node: any) => void) => void;
};

export const OldInputTemplate = (props: InputTemplatePropTypes) => {
  const
    {
      input = {}, theType, label, inputRef, autoFocus, inputClass, divClass,
      placeholder, left, tabIndex, right, autoComplete, disabled,
      meta: { submitting, touched, error } = {},
    } = props,
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
