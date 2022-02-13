type NumericPropTypes = {
  readonly optional?: boolean;
  readonly size?: number;
  readonly customClass?: any;
  readonly divClass?: any;
  readonly input: any;
  readonly label?: string;
  readonly meta: {
    error?: string;
    submitting: boolean;
    touched: boolean;
  };
  readonly placeholder?: string;
  readonly value?: string;
  readonly autoFocus?: boolean;
  readonly type: string;
  readonly inputClass?: string;
  readonly left?: string;
  readonly tabIndex?: number;
  readonly right?: string;
  readonly formatValue: (raw: any, optional?: boolean) => string;
  readonly normalizeValue: (raw: string | null) => any;
  readonly onBlur?: () => void;
  readonly onChange?: (event: any) => void;
  readonly onRegisterRef?: any;
};
type NumericStateTypes = {
  value: any;
};
import React from "react";
import classnames from "classnames";
import { formatZeroValue, handleBlur, normalizeFloat, cwrp } from "../utility";

/* eslint-disable */
export class NumericTemplate extends React.Component<NumericPropTypes, NumericStateTypes> {
  static defaultProps = {
    formatValue    : formatZeroValue,
    normalizeValue : normalizeFloat,
  };

  state: NumericStateTypes;
  handleBlur: () => void;
  handleKeyDown: (event: any) => void;
  handleChange: ({ target: { value } }: any) => void;

  constructor (props: NumericPropTypes) {
    super(props);
    this.state = {
      value: props.input.value,
    };

    this.handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        this.handleBlur();
      }
    };

    this.handleBlur = () => {
      handleBlur(this);
    };

    this.handleChange = ({
      target: {
        value,
      },
    }: any) => {
      this.props.input.onChange();

      /*
       * Update the internal state to trigger a re-render
       * using the formatted value
       */
      this.setState({
        value,
      });
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps: NumericPropTypes) {
    cwrp(this, nextProps);
  }

  render () {
    const {
        input,
        label,
        onRegisterRef,
        meta: {
          submitting,
          touched,
          error,
        },
        formatValue,
        type,
        autoFocus,
        inputClass,
        placeholder,
        left,
        size,
        right,
        tabIndex,
        divClass,
      } = this.props,
      warningClass = `${touched && error ? " is-invalid" : ""}`,
      customClass = `${inputClass ? ` ${inputClass}` : ""}`,
      classForInput = `form-control ${warningClass}${customClass}`,
      classForDiv = `form-group row ${divClass ? divClass : ""}`;

    return (
      <div className={classnames(classForDiv, {
        "is-invalid": touched && error,
      })}>
        <label
          className={`${left ? left : "col-md-4 text-md-right"} form-control-label`}
          htmlFor={input.name}>
          {label}
        </label>
        <div className={right ? right : "col-md-8"}>
          <input
            aria-label={label}
            autoFocus={autoFocus}
            className={classForInput}
            disabled={submitting}
            id={input.name}
            maxLength={size}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={input.onFocus}
            onKeyDown={this.handleKeyDown}
            placeholder={placeholder}
            ref={onRegisterRef}
            tabIndex={tabIndex}
            type={type}
            value={formatValue(this.state.value, this.props.optional)}
          />
          <div className="invalid-feedback">
            {touched && error && (
              <span>
                {error}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

}
