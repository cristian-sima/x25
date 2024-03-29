type BankNamePropTypes = {
  readonly input: any;
  readonly meta: {
    submitting: boolean;
    touched: boolean;
    error: string | null | undefined;
  };
};
import React from "react";
import classnames from "classnames";
import { words } from "../../utility";

const BankNameField = ({
  input,
  meta: {
    error,
    submitting,
    touched,
  },
}: BankNamePropTypes) => (
  <div className={classnames("input-group", {
    "is-invalid": touched && error,
  })}>
    <div className="input-group-prepend">
      <span className="input-group-text">{words.BankName}</span>
    </div>
    <input
      {...input} aria-label={words.BankName} className={classnames("form-control", {
        "is-invalid": touched && error,
      })}
      disabled={submitting}
      id={input.name}
      name={input.name}
      placeholder={words.BankName} type="text"
    />
  </div>
);

export default BankNameField;
