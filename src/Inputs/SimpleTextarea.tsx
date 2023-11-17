type TextareaPropTypes = {
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly input: any;
  readonly label: string;
  readonly placeholder: string;
  readonly inputClass?: string;
  readonly tabIndex?: string;
  readonly rows?: string;
  readonly meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
  readonly onRegisterRef?: (callback: (node: any) => void) => void;
};
import React from "react";

export const SimpleTextarea = ({
  disabled,
  input, label, onRegisterRef, autoFocus, inputClass, placeholder, tabIndex, rows,
  meta: { submitting, touched, error },
}: TextareaPropTypes) => {
  const
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
