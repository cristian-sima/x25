type CaptchaPropTypes = {
  readonly id: string;

  readonly tabIndex?: string;
  readonly input?: any;
  readonly label?: string;
  readonly autoFocus?: boolean;
  readonly left?: string;
  readonly right?: string;
  readonly meta?: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
};

import React from "react";
import classnames from "classnames";
import Tooltip from "react-simple-tooltip";
import { words } from "../utility";

const InfoIcon = () => (
  <div className="d-inline float-right">
    <Tooltip content={words.CaptchaDescription}>
      <i className="fa fa-info-circle fa-2x text-info pull-right" id="TooltipExample" />
    </Tooltip>
  </div>
);

export const CaptchaBox = (props: CaptchaPropTypes) => {
  const { autoFocus, id, input, tabIndex, label, left, right, meta } = props;

  if (typeof id === "undefined" || id === "") {
    return null;
  }

  return (
    <div className="form-group row">
      <label
        className={`${left ? left : "col-md-4 text-md-right"} form-control-label`}
        htmlFor={input.name}>
        {`${words.CaptchaVerify} `}
        <InfoIcon />
      </label>
      <div className={right ? right : "col-md-8"}>
        <div className="custom-class">
          <span className="custom-control-description text-muted">
            {words.CaptchaTypeNumbers}
          </span>
          <div className="text-center my-1">
            <img alt="CaptchaBox" src={`/captcha/${id}.png`} />
          </div>
        </div>
        <input
          {...input} aria-label={label} autoFocus={autoFocus} className={classnames("form-control", {
            "is-invalid": meta?.touched && meta?.error,
          })}
          disabled={meta?.submitting}
          id={input.name}
          placeholder={words.CaptchaTypeNumbers}
          tabIndex={tabIndex}
        />
        <div className="invalid-feedback">
          {meta?.touched && meta?.error ? (
            <span>
              {meta?.error}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
