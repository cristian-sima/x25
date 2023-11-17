
type NumericPropTypes = {
  autoFocus?: boolean;
  disabled?: boolean;
  customClass?: any;
  divClass?: any;
  input: any;
  inputClass?: string;
  label?: string;
  left?: string;
  optional?: boolean;
  precision?: number;
  placeholder?: string;
  right?: string;
  size?: number;
  tabIndex?: number;
  type: string;
  value?: string;
  meta: {
    error?: string;
    submitting: boolean;
    touched: boolean;
  };
  formatValue: (raw: any, optional?: boolean) => string;
  normalizeValue: (raw: string | null) => any;
  onBlur?: () => void;
  onKeyDown?: (event: any) => void;
  onChange?: (event: any) => void;
  onRegisterRef?: any;
};

import classnames from "classnames";
import React from "react";
import { formatZeroValue } from "../utility";


import { clearFloatOnBlur, floatToEnglishComma, getFloatValueToStore, isFloat } from "./common";

export const
  NumericTemplate = (props : NumericPropTypes) => {
    const
      {
        precision = 2,
        input, right, tabIndex, divClass, label,
        onRegisterRef,
        meta: { submitting, touched, error }, formatValue = formatZeroValue,
        type, autoFocus, inputClass, placeholder, left, size, disabled,
      } = props,

      [value, setValue] = React.useState(props.input.value),

      valueToShow = formatValue(value, props.optional),

      updateValue = (targetValue: any) => {
        setValue(targetValue);

        let valueToStore = targetValue;

        if (isFloat(floatToEnglishComma(targetValue))) {
          valueToStore = getFloatValueToStore(targetValue);
        }

        input.onChange(valueToStore);
      },

      handleBlur = (event: any) => {
        const
          newValue = clearFloatOnBlur(value, precision),
          hasChanged = value !== newValue;

        if (hasChanged) {
          updateValue(newValue);
        }

        input.onBlur(event);
      },

      handleChange = ({ target: { value : targetValue } }: any) => {
        updateValue(targetValue);
      },
      warningClass = `${touched && error ? " is-invalid" : ""}`,
      customClass = `${inputClass ? ` ${inputClass}` : ""}`,
      classForInput = `form-control ${warningClass}${customClass}`,
      classForDiv = `form-group mt-md-2 row ${divClass ? divClass : ""}`;


    React.useEffect(() => {
      if (isFloat(input.value) || input.value === "") {
        updateValue(input.value);
      }
    }, [input.value]);

    return (
      <div className={classnames(`${classForDiv} d-flex`, {
        "is-invalid": touched && error,
      })}>
        <label
          className={`${left ? `${left} align-self-center` : "col-md-4 text-md-end"} form-control-label align-self-center`}
          htmlFor={input.name}>
          {label}
        </label>
        <div className={right ? `${right} align-self-center` : "col-md-8 align-self-center"}>
          <input
            aria-label={label}
            autoFocus={autoFocus}
            className={classForInput}
            disabled={submitting || disabled}
            id={input.name}
            inputMode="decimal"
            maxLength={size}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={props.onKeyDown}
            placeholder={placeholder}
            ref={onRegisterRef}
            tabIndex={tabIndex}
            type={type}
            value={valueToShow}
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

