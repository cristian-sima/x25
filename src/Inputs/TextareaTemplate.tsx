
import classnames from "classnames";
import React from "react";
import { SimpleTextarea } from "./SimpleTextarea";
import { MetaProps } from "src/types";

type InputTemplatePropTypes = {
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly field: any;
  readonly inputClass?: string;
  readonly label: string;
  readonly left?: string;
  readonly meta: MetaProps;
  readonly placeholder: string;
  readonly right?: string;
  readonly tabIndex?: string;
  readonly onRegisterRef?: (callback: (node: any) => void) => void;
};

export const TextareaTemplate = (props: InputTemplatePropTypes) => {
  const
    {
      field = {}, label, left, right,
      meta: { touched, error } = {},
    } = props;

  return (
    <div className={classnames("form-group mt-md-2 row d-flex", {
      "is-invalid": touched && error,
    })}>
      <label
        className={`${left ? `${left} align-self-center` : "col-md-4"} text-md-end form-control-label align-self-center`}
        htmlFor={field.name}>
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
