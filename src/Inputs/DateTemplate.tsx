
import classnames from "classnames";
import React from "react";
import { MetaProps } from "../types";
import { formatDate, normalizeDate, words } from "../utility";
import { isValidDate } from "../utility/validation";

type DateInputPropTypes = {
  readonly currency?: boolean;
  readonly customClass?: any;
  readonly input: any;
  readonly label:string;
  readonly left?: string;
  readonly meta: MetaProps;
  readonly placeholder?: string;
  readonly right?: string;
  readonly tabIndex?: string;
  readonly value?: string;
  readonly formatValue: (raw: string) => string;
  readonly normalizeValue: (raw: string) => any;
  readonly onBlur?: () => void;
  readonly onChange?: (event: any) => void;
  readonly onRegisterRef?: (callback: (node: any) => void) => void;
}

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

export const OldDateTemplate = (props : DateInputPropTypes) => {
  const

    { customClass, input = {}, onRegisterRef, tabIndex, placeholder,
      meta = {} as MetaProps, right, left, label } = props,

    [value, setValue] = React.useState(input.value),

    valueToShow = formatRawDate(value),

    updateValue = (targetValue : string) => {

      const normalizedValue = normalizeRawDate(addZeroIfNeeded(targetValue));

      setValue(targetValue);
      input.onChange(normalizedValue);

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
      className={classnames("form-group mt-md-2 row d-flex", { "is-invalid": meta.touched && meta.error })}>
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
            "is-invalid": meta.touched && meta.error,
          })}
          disabled={meta.submitting}
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
          {meta.touched && meta.error ? (
            <span>
              {meta.error}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};


