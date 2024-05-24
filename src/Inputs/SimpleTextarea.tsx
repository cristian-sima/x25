
import React from "react";
import { MetaProps } from "src/types";

type TextareaPropTypes = {
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly field: any;
  readonly inputClass?: string;
  readonly label: string;
  readonly meta: MetaProps;
  readonly placeholder: string;
  readonly rows?: string;
  readonly tabIndex?: string;
  readonly onRegisterRef?: (callback: (node: any) => void) => void;
};

export const SimpleTextarea = (props: TextareaPropTypes) => {
  const
    {
      disabled,
      field = {}, label, onRegisterRef, autoFocus, inputClass, placeholder, tabIndex, rows,
      meta: { submitting, touched, error } = {},
    } = props,
    warningClass = `${touched && error ? " is-invalid" : ""}`,
    customClass = `${inputClass ? ` ${inputClass}` : ""}`,
    classForInput = `form-control ${warningClass}${customClass}`;

  return (
    <textarea
      {...field}
      aria-label={label}
      autoFocus={autoFocus}
      className={classForInput}
      disabled={disabled || submitting}
      id={field.name}
      placeholder={placeholder}
      ref={onRegisterRef ? onRegisterRef : null}
      rows={rows}
      tabIndex={tabIndex}
    />
  );
};
