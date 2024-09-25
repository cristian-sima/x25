
import React from "react";
import { MetaProps } from "src/types";

type TextareaPropTypes = {
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly input: any;
  readonly inputClass?: string;
  readonly label: string;
  readonly meta: MetaProps;
  readonly placeholder: string;
  readonly rows?: string;
  readonly tabIndex?: string;
  readonly onRegisterRef?: (callback: (node: any) => void) => void;
};

export const OldSimpleTextarea = (props: TextareaPropTypes) => {
  const
    {
      disabled,
      input = {}, label, onRegisterRef, autoFocus, inputClass, placeholder, tabIndex, rows,
      meta: { submitting, touched, error } = {},
    } = props,
    warningClass = `${touched && error ? " is-invalid" : ""}`,
    customClass = `${inputClass ? ` ${inputClass}` : ""}`,
    classForInput = `form-control ${warningClass}${customClass}`;

  return (
    <textarea
      {...input}
      aria-label={label}
      autoFocus={autoFocus}
      className={classForInput}
      disabled={disabled || submitting}
      id={input.name}
      placeholder={placeholder}
      ref={onRegisterRef ? onRegisterRef : null}
      rows={rows}
      tabIndex={tabIndex}
    />
  );
};
