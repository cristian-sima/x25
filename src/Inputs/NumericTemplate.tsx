
type NumericPropTypes = {
  readonly autoFocus?: boolean;
  readonly customClass?: any;
  readonly disabled?: boolean;
  readonly divClass?: any;
  readonly field: any;
  readonly inputClass?: string;
  readonly label?: string;
  readonly left?: string;
  readonly meta: MetaProps;
  readonly onRegisterRef?: any;
  readonly optional?: boolean;
  readonly placeholder?: string;
  readonly precision?: number;
  readonly right?: string;
  readonly size?: number;
  readonly tabIndex?: number;
  readonly type: string;
  readonly value?: string;
  readonly formatValue: (raw: any, optional?: boolean) => string;
  readonly normalizeValue: (raw: string | null) => any;
  readonly onBlur?: () => void;
  readonly onChange?: (event: any) => void;
  readonly onKeyDown?: (event: any) => void;
};

import classnames from "classnames";
import React from "react";
import { formatZeroValue } from "../utility";
import { clearFloatOnBlur, floatToEnglishComma, getFloatValueToStore, isFloat } from "./common";
import { MetaProps } from "src/types";

export const
  NumericTemplate = (props : NumericPropTypes) => {
    const
      {
        precision = 2,
        field = {}, right, tabIndex, divClass, label,
        onRegisterRef,
        meta: { submitting, touched, error } = {}, formatValue = formatZeroValue,
        type, autoFocus, inputClass, placeholder, left, size, disabled,
      } = props,

      [value, setValue] = React.useState(props.field.value || ""),

      valueToShow = formatValue(value, props.optional),

      updateValue = (targetValue: any) => {
        setValue(targetValue);

        let valueToStore = targetValue;

        if (isFloat(floatToEnglishComma(targetValue))) {
          valueToStore = getFloatValueToStore(targetValue);
        }

        field.onChange(valueToStore);
      },

      handleBlur = (event: any) => {
        const
          newValue = clearFloatOnBlur(value, precision),
          hasChanged = value !== newValue;

        if (hasChanged) {
          updateValue(newValue);
        }

        field.onBlur(event);
      },

      handleChange = ({ target: { value : targetValue } }: any) => {
        updateValue(targetValue);
      },
      warningClass = `${touched && error ? " is-invalid" : ""}`,
      customClass = `${inputClass ? ` ${inputClass}` : ""}`,
      classForInput = `form-control ${warningClass}${customClass}`,
      classForDiv = `form-group mt-md-2 row ${divClass ? divClass : ""}`;


    React.useEffect(() => {
      if (isFloat(field.value) || field.value === "") {
        updateValue(field.value);
      }
    }, [field.value]);

    return (
      <div className={classnames(`${classForDiv} d-flex`, {
        "is-invalid": touched && error,
      })}>
        <label
          className={`${left ? `${left} align-self-center` : "col-md-4 text-md-end"} form-control-label align-self-center`}
          htmlFor={field.name}>
          {label}
        </label>
        <div className={right ? `${right} align-self-center` : "col-md-8 align-self-center"}>
          <input
            aria-label={label}
            autoFocus={autoFocus}
            className={classForInput}
            disabled={submitting || disabled}
            id={field.name}
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

