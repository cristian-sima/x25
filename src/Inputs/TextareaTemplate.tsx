type InputTemplatePropTypes = {
  readonly autoFocus?: boolean;
  readonly input: any;
  readonly label: string;
  readonly placeholder: string;
  readonly inputClass?: string;
  readonly tabIndex?: string;
  disabled?: boolean;
  readonly meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
  readonly left?: string;
  readonly right?: string;
  readonly onRegisterRef?: (callback: (node: any) => void) => void;
};
import React from "react";
import classnames from "classnames";
import { SimpleTextarea } from "./SimpleTextarea";

export const TextareaTemplate = (props: InputTemplatePropTypes) => {
  const {
    input, label, left, right,
    meta: { touched, error },
  } = props;

  return (
    <div className={classnames("form-group row", {
      "is-invalid": touched && error,
    })}>
      <label
        className={`${left ? left : "col-md-4"} text-md-right form-control-label`}
        htmlFor={input.name}>
        {label}
      </label>
      <div className={right ? right : "col-md-8"}>
        <SimpleTextarea {...props} />
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
