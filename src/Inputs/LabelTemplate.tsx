
import React from "react";
import { MetaProps } from "src/types";

type LabelTemplatePropTypes = {
  readonly input: any;
  readonly label: string;
  readonly tabIndex?: string;
  readonly offset?: string;
  readonly meta: MetaProps;
};

export const OldLabelTemplate = (props: LabelTemplatePropTypes) => {
  const {
    input = {}, tabIndex, label, offset, meta: { submitting, touched, error } = {},
  } = props;
  
  return (
    <div className="container">
      <div className="form-group mt-md-2 row mb-1">
        <div className={`${offset || ""} col custom-control custom-checkbox`}>
          <input
            {...input}
            aria-label={label}
            className="custom-control-input"
            disabled={submitting}
            id={input.name}
            tabIndex={tabIndex}
            type="checkbox" />
          <label
            className="custom-control-label"
            htmlFor={input.name}>
            {label}
          </label>
          <div className="invalid-feedback">
            {touched && error ? (
              <span>
                {error}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
