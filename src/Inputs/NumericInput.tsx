


import classnames from "classnames";
import React from "react";
import { formatZeroValue } from "../utility";
import { clearFloatOnBlur, floatToEnglishComma, getFloatValueToStore, isFloat } from "./common";

type NumericPropTypes = {
  readonly autoFocus?: boolean;
  readonly currency?: boolean;
  readonly customClass?: any;
  readonly disabled?: boolean;
  readonly input: any;
  readonly label?: string;
  readonly meta: any;
  readonly onRegisterRef?: any;
  readonly optional?: boolean;
  readonly placeholder?: string;
  readonly precision?: number;
  readonly size?: number;
  readonly tabIndex?: number;
  readonly value?: string;
  readonly form: any;  readonly formatValue: (raw: any, optional?: boolean) => string;
  readonly normalizeValue: (raw: any) => any;
  readonly onBlur?: () => void;
  readonly onChange: (event: any) => void;
  readonly onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readonly onKeyDown?: (event: any) => void;
};

export const
  OldNumericInput = (props : NumericPropTypes) => {
    const
      {
        precision = 2,
        customClass, input, label, disabled, currency, tabIndex, onRegisterRef, formatValue = formatZeroValue,
        size, placeholder, meta: { submitting, touched, error } = {},
      } = props,

      [value, setValue] = React.useState(input.value || ""),

      noCurrency = (typeof currency === "undefined" || currency === false),
      valueToShow = formatValue(value, props.optional),

      updateValue = (targetValue : any) => {        
        setValue(targetValue);

        let valueToStore = targetValue;

        if (isFloat(floatToEnglishComma(targetValue))) {
          valueToStore = getFloatValueToStore(targetValue);
        }

        input.onChange(valueToStore);
      },

      handleBlur = ({ target: { value: targetValue } } : any) => {
        const
          newValue = clearFloatOnBlur(value, precision),
          hasChanged = value !== newValue;

        if (hasChanged) {
          updateValue(newValue);
        }

        if (typeof input.onBlur === "function") {
          input.onBlur(targetValue);
        }
      },

      handleChange = ({ target: { value: targetValue } }: any) => {
        updateValue(targetValue);
      },

      handleFocus = (event : React.FocusEvent<HTMLInputElement>) => {
        if (typeof input.onFocus === "function") {
          input.onFocus(event);
        }

        if (typeof props.onFocus === "function") {
          props.onFocus(event);
        }
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
          onFocus={handleFocus}
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

