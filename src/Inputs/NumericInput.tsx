type NumericPropTypes = {
  readonly currency?: boolean;
  readonly optional?: boolean;
  readonly size?: number;
  readonly customClass?: any;
  readonly input: any;
  readonly label?: string;
  readonly meta: {
    error?: string;
    submitting: boolean;
    touched: boolean;
  };
  readonly tabIndex?: number;
  readonly placeholder?: string;
  readonly value?: string;
  readonly formatValue: (raw: any, optional?: boolean) => string;
  readonly normalizeValue: (raw: any) => any;
  readonly onBlur?: () => void;
  readonly onChange?: (event: any) => void;
  readonly onRegisterRef?: any;
};
type NumericStateTypes = {
  value: any;
};
import React from "react";
import classnames from "classnames";
import { formatZeroValue, normalizeFloat, handleBlur, cwrp } from "../utility";

export class NumericInput extends React.Component<NumericPropTypes, NumericStateTypes> {
  static defaultProps = {
    formatValue    : formatZeroValue,
    normalizeValue : normalizeFloat,
  };

  state: NumericStateTypes;
  handleBlur: () => any;
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
        customClass,
        input,
        label,
        currency,
        tabIndex,
        onRegisterRef,
        meta: {
          submitting,
          touched,
          error,
        },
        formatValue,
        size,
        placeholder,
      } = this.props,
      inputComponent = (
        <input
          aria-label={label}
          className={classnames(`form-control ${customClass || ""}`, {
            "is-invalid": touched && error,
          })}
          disabled={submitting}
          id={input.name}
          maxLength={size}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={input.onFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholder || label}
          ref={onRegisterRef}
          tabIndex={tabIndex}
          type="text"
          value={formatValue(this.state.value, this.props.optional)}
        />
      );

    if (typeof currency === "undefined" || currency === false) {
      return (<div className="form-group-inline">
        {inputComponent}
      </div>);
    }

    return (
      <div className="input-group">
        {inputComponent}
        <div className="input-group-append">
          <span className="input-group-text">
            {currency}
          </span>
        </div>
      </div>
    );
  }

}
