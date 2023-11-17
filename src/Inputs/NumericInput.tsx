
type NumericPropTypes = {
  precision?: number;
  autoFocus?: boolean;
  currency?: boolean;
  optional?: boolean;
  disabled?: boolean;
  size?: number;
  customClass?: any;
  input: any;
  label?: string;
  meta: {
    error?: string;
    submitting: boolean;
    touched: boolean;
  };
  tabIndex?: number;
  placeholder?: string;
  value?: string;
  formatValue: (raw: any, optional?: boolean) => string;
  normalizeValue: (raw: any) => any;
  onBlur?: () => void;
  onChange?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onRegisterRef?: any;
};

import classnames from "classnames";
import React from "react";
import { formatZeroValue } from "../utility";

import { clearFloatOnBlur, floatToEnglishComma, getFloatValueToStore, isFloat } from "./common";

export const
  NumericInput = (props : NumericPropTypes) => {
    const
      {
        precision = 2,
        customClass, input, label, disabled, currency, tabIndex, onRegisterRef, formatValue = formatZeroValue,
        size, placeholder, meta: { submitting, touched, error },
      } = props,

      [value, setValue] = React.useState(props.input.value),

      noCurrency = (typeof currency === "undefined" || currency === false),
      valueToShow = formatValue(value, props.optional),

      updateValue = (targetValue: any) => {
        setValue(targetValue);

        let valueToStore = targetValue;

        if (isFloat(floatToEnglishComma(targetValue))) {
          valueToStore = getFloatValueToStore(targetValue);
        }

        input.onChange(valueToStore);
      },

      handleBlur = (event : any) => {
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

      inputComponent = (
        <input
          aria-label={label}
          autoFocus={props.autoFocus}
          className={classnames(`form-control ${customClass || ""}`, {
            "is-invalid": touched && error,
          })}
          disabled={submitting || disabled}
          id={input.name}
          inputMode="decimal"
          maxLength={size}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={props.onKeyDown}
          placeholder={placeholder || label}
          ref={onRegisterRef}
          tabIndex={tabIndex}
          type="text"
          value={valueToShow}
        />
      );

    React.useEffect(() => {
      if (isFloat(input.value) || input.value === "") {
        updateValue(input.value);
      }
    }, [input.value]);

    if (noCurrency) {
      return inputComponent;
    }

    return (
      <div className="input-group">
        {inputComponent}
        <div className="input-group-append">
          <span className="input-group-text">
            {currency}
          </span>
        </div>
      </div>
    );
  };

