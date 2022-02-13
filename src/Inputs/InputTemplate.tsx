type InputTemplatePropTypes = {
  readonly autoFocus?: boolean;
  readonly input: any;
  readonly label: string;
  readonly placeholder: string;
  readonly type: string;
  readonly divClass?: string;
  readonly inputClass?: string;
  readonly meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
  readonly tabIndex?: string;
  readonly left?: string;
  readonly right?: string;
  readonly onRegisterRef?: (callback: (node: any) => void) => void;
};
import React from "react";
import classnames from "classnames";

export const InputTemplate = ({
  input,
  type,
  label,
  onRegisterRef,
  autoFocus,
  inputClass,
  divClass,
  placeholder,
  left,
  tabIndex,
  right,
  meta: {
    submitting,
    touched,
    error,
  },
}: InputTemplatePropTypes) => {
  const warningClass = `${touched && error ? " is-invalid" : ""}`,
    customClass = `${inputClass ? ` ${inputClass}` : ""}`,
    classForInput = `form-control ${warningClass}${customClass}`,
    classForDiv = `form-group row mt-md-2 ${divClass ? divClass : ""}`;

  return (<div className={classnames(classForDiv, {
    "is-invalid": touched && error,
  })}>
    <label className={`${left ? left : "col-md-4 text-md-right"} form-control-label`} htmlFor={input.name}>
      {label}
    </label>
    <div className={right ? right : "col-md-8"}>
      <input {...input} aria-label={label} autoComplete={input.name} autoFocus={autoFocus} className={classForInput} disabled={submitting} id={input.name} placeholder={placeholder} ref={onRegisterRef ? onRegisterRef : null} tabIndex={tabIndex} type={type} />
      <div className="invalid-feedback">
        {touched && error && (<span>
          {error}
                              </span>)}
      </div>
    </div>
  </div>);
};
