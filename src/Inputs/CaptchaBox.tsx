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

import classnames from "classnames";
import Tooltip from "rc-tooltip";
import React from "react";
import { words } from "../utility";

const InfoIcon = () => (
  <div className="d-inline float-end">
    <Tooltip
      arrowContent={<div className="rc-tooltip-arrow-inner" />}
      destroyTooltipOnHide
      overlay={words.CaptchaDescription}
      placement="top">
      <i className="fa fa-info-circle fa-2x text-info pull-end" id="TooltipExample" />
    </Tooltip>
  </div>
);

export const CaptchaBox = (props: CaptchaPropTypes) => {
  const { autoFocus, id, input, tabIndex, label, left, right, meta } = props;

  if (typeof id === "undefined" || id === "") {
    return null;
  }

  return (
    <div className="form-group row d-flex">
      <label
        className={`${left ? `${left} align-self-center` : "col-md-4 text-md-end"} form-control-label align-self-center`}
        htmlFor={input.name}>
        {`${words.CaptchaVerify} `}
        <InfoIcon />
      </label>
      <div className={right ? `${right} align-self-center` : "col-md-8 align-self-center"}>
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
