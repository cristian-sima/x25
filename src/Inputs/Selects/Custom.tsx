type SelectMonthPropTypes = {
  readonly disabled: boolean;
  readonly input: any;
  readonly valueKey?: string;
  readonly nameKey?: string;
  readonly label?: string;
  readonly isImmutable?: boolean;
  readonly showEmptyOption?: boolean;
  readonly tabIndex?: string;
  readonly left?: string;
  readonly inputClass?: string;
  readonly right?: string;
  readonly id?: string;
  readonly data: any;
  readonly meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
};
import React from "react";
import Simple from "./Simple";

const CustomSelect = (props: SelectMonthPropTypes) => {
  const {
      input,
      meta: {
        touched,
        error,
      },
      left,
      right,
      label,
      id,
    } = props,
    customID = `custom-select-${input.name}${id || ""}`;

  return (
    <div className="form-group row">
      <label
        className={`${left ? left : "col-md-4 text-md-right"} form-control-label`}
        htmlFor={customID}>
        {label}
      </label>
      <div className={right ? right : "col-md-8"}>
        <Simple {...props} />
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

export default CustomSelect;
