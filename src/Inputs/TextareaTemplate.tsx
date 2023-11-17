type InputTemplatePropTypes = {
  readonly autoFocus?: boolean;
  readonly input: any;
  readonly label: string;
  readonly placeholder: string;
  readonly inputClass?: string;
  readonly tabIndex?: string;
  readonly disabled?: boolean;
  readonly meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
  readonly left?: string;
  readonly right?: string;
  readonly onRegisterRef?: (callback: (node: any) => void) => void;
};
import classnames from "classnames";
import React from "react";
import { SimpleTextarea } from "./SimpleTextarea";

export const TextareaTemplate = (props: InputTemplatePropTypes) => {
  const {
    input, label, left, right,
    meta: { touched, error },
  } = props;

  return (
    <div className={classnames("form-group mt-md-2 row d-flex", {
      "is-invalid": touched && error,
    })}>
      <label
        className={`${left ? `${left} align-self-center` : "col-md-4"} text-md-end form-control-label align-self-center`}
        htmlFor={input.name}>
        {label}
      </label>
      <div className={right ? `${right} align-self-center` : "col-md-8 align-self-center"}>
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
