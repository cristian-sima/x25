type DateInputPropTypes = {
  readonly customClass?: any;
  readonly input: any;
  readonly meta: {
    error?: string;
    submitting: boolean;
    touched: boolean;
  };
  readonly placeholder?: string;
  readonly value?: string;
  readonly tabIndex?: string;
  readonly currency?: boolean;
  readonly formatValue: (raw: string) => string;
  readonly normalizeValue: (raw: string) => any;
  readonly onBlur?: () => void;
  readonly onChange?: (event: any) => void;
  readonly onRegisterRef?: (callback: (node: any) => void) => void;
  readonly right?: string;
  readonly left?: string;
  readonly label:string;
}
import classnames from "classnames";
import React from "react";
import { formatDate, normalizeDate, words } from "../utility";
import { isValidDate } from "../utility/validation";

const
  addZeroIfNeeded = (raw : string) => {
    const
      nrOfElements = 3,
      canAddZero = (
        (typeof raw === "string") &&
      (raw.split(".").length === nrOfElements)
      );

    if (!canAddZero) {
      return raw;
    }

    const
      perform = (value : string) => (
        value.length === 1 ? `0${value}` : value
      ),
      parts = raw.split("."),
      part1 = perform(parts[0]),
      part2 = perform(parts[1]),
      [, , part3] = parts,

      newValue = [part1, part2, part3].join(".");


    if (isValidDate(newValue)) {
      return newValue;
    }

    return raw;
  },
  normalizeRawDate = (raw: string): string => {
    if (isValidDate(raw)) {
      return normalizeDate(raw);
    }

    return "";
  },

  formatRawDate = (raw: string): string => {
    if (typeof raw !== "undefined") {
      return formatDate(raw);
    }

    return "";
  };

export const DateTemplate = (props : DateInputPropTypes) => {
  const

    { customClass, input, onRegisterRef, tabIndex, placeholder,
      meta: { submitting, touched, error }, right, left, label } = props,

    [value, setValue] = React.useState(input.value),

    valueToShow = formatRawDate(value),

    updateValue = (targetValue : string) => {

      const normalizedValue = normalizeRawDate(addZeroIfNeeded(targetValue));

      setValue(targetValue);
      props.input.onChange(normalizedValue);

    },

    handleBlur = (event: any) => {
      const
        { target: { value : targetValue } } = event,
        newValue = addZeroIfNeeded(targetValue),
        hasChanged = targetValue !== newValue;

      if (hasChanged) {
        updateValue(newValue);
      }

      input.onBlur(event);
    },

    handleChange = ({ target: { value : targetValue } }: any) => {
      updateValue(targetValue);
    };

  return (
    <div
      className={classnames("form-group mt-md-2 row d-flex", { "is-invalid": touched && error })}>
      <label
        className={`${left ? `${left} align-self-center` : "col-md-4 text-md-end"} form-control-label`}
        htmlFor={input.name}>
        {label}
      </label>
      <div className={right ? `${right} align-self-center` : "col-md-8"}>
        <input
          {...input}
          aria-label={label}
          className={classnames(`form-control ${customClass || ""}`, {
            "is-invalid": touched && error,
          })}
          disabled={submitting}
          id={input.name}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder || words.DateFormat}
          ref={onRegisterRef}
          tabIndex={tabIndex}
          type="text"
          value={valueToShow}
        />
        <div
          className="invalid-feedback">
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


