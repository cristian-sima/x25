type SelectMonthPropTypes = {
  readonly disabled: boolean;
  readonly input: any;
  readonly autoFocus?: boolean;
  readonly valueKey?: string;
  readonly nameKey?: string;
  readonly isImmutable?: boolean;
  readonly showEmptyOption?: boolean;
  readonly tabIndex?: string;
  readonly inputClass?: string;
  readonly id?: string;
  readonly data: any;
  readonly meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
};
import classnames from "classnames";
import React from "react";
import { words } from "../../utility";

const SimpleCustomSelect = ({
  autoFocus, isImmutable, showEmptyOption, valueKey = "value", nameKey = "name",
  data, tabIndex, input, id, inputClass, disabled,
  meta: { submitting, touched, error },
}: SelectMonthPropTypes) => {
  const
    theClasses = classnames(`custom-select ${inputClass || ""}`, {
      "is-invalid": touched && error,
    }),
    customID = `custom-select-${input.name}${id || ""}`;

  return (
    <select
      {...input}
      autoFocus={autoFocus}
      className={theClasses}
      disabled={submitting || disabled}
      id={customID}
      tabIndex={tabIndex}>
      {showEmptyOption ? <option value="">{words.Select}</option> : null}
      {isImmutable ? data.map((current : any) => {
        const
          value = current.get(valueKey),
          name = current.get(nameKey);

        return (
          <option key={value} value={value}>
            {name}
          </option>
        );
      }) : data.map(({
        [valueKey]: value,
        [nameKey]: name,
      } : any) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default SimpleCustomSelect;
