type CaptchaPropTypes = {
  readonly type: string;
  readonly id: string;
  readonly tabIndex?: string;
  readonly input: any;
  readonly label: string;
  readonly autoFocus?: boolean;
  readonly left?: string;
  readonly right?: string;
  readonly meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
};
type InfoIconStateTypes = {
  showTooltip: boolean;
};
import React from "react";
import { Tooltip } from "reactstrap";
import classnames from "classnames";
import { words } from "../utility";

class InfoIcon extends React.Component<any, InfoIconStateTypes> {
  state: InfoIconStateTypes;
  toggle: () => void;

  constructor (props : any) {
    super(props);
    this.state = {
      showTooltip: false,
    };

    this.toggle = () => {
      this.setState((prevState: InfoIconStateTypes) => ({
        showTooltip: !prevState.showTooltip,
      }));
    };
  }

  render () {
    return (
      <div className="d-inline float-right">
        <i className="fa fa-info-circle fa-2x text-info pull-right" id="TooltipExample" />
        <Tooltip
          isOpen={this.state.showTooltip}
          placement="right"
          target="TooltipExample"
          toggle={this.toggle}>
          {words.CaptchaDescription}
        </Tooltip>
      </div>
    );
  }

}

export const CaptchaBox = (props: CaptchaPropTypes) => {
  const {
    autoFocus,
    id,
    input,
    tabIndex,
    label,
    left,
    right,
    meta: {
      touched,
      error,
      submitting,
    },
    type,
  } = props;

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
            "is-invalid": touched && error,
          })}
          disabled={submitting}
          id={input.name}
          placeholder={words.CaptchaTypeNumbers}
          tabIndex={tabIndex}
          type={type} />
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
