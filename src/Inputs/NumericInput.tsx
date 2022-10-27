
type NumericPropTypes = {
     currency?: boolean;
     optional?: boolean;
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
     onRegisterRef?: any;
  };

import React from "react";
import classnames from "classnames";
import { formatZeroValue } from "../utility";

import { getFloatValueToStore, clearFloatOnBlur, isFloat, floatToEnglishComma } from "./common";

export const
  NumericInput = (props : NumericPropTypes) => {
    const
      {
        customClass, input, label, currency, tabIndex, onRegisterRef, formatValue = formatZeroValue,
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
          newValue = clearFloatOnBlur(value),
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
          className={classnames(`form-control ${customClass || ""}`, {
            "is-invalid": touched && error,
          })}
          disabled={submitting}
          id={input.name}
          maxLength={size}
          onBlur={handleBlur}
          onChange={handleChange}
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

