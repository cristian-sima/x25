/* eslint-disable react/no-unsafe */

type DateTemplatePropTypes = {
  readonly customClass?: any;
  readonly input: any;
  readonly label?: string;
  readonly meta: {
    error?: string;
    submitting: boolean;
    touched: boolean;
  };
  readonly left?: string;
  readonly right?: string;
  readonly placeholder?: string;
  readonly value?: string;
  readonly tabIndex?: string;
  readonly currency?: boolean;
  readonly formatValue: (raw: string) => string;
  readonly normalizeValue: (raw: string) => any;
  readonly onBlur?: () => void;
  readonly onChange?: (event: any) => void;
  readonly onRegisterRef?: (callback: (node: any) => void) => void;
};
type DateTemplateStateTypes = {
  value: string;
};
import React from "react";
import classnames from "classnames";
import { formatDate, isValidDate, normalizeDate, words } from "../utility";


const normalizeRawDate = (raw: string): string => {
  /* eslint-disable no-magic-numbers */
    if (isValidDate(raw)) {
      return normalizeDate(raw);
    }

    return raw;
  },

  formatRawDate = (raw: string): string => {
  /* eslint-disable no-magic-numbers */
    if (typeof raw !== "undefined") {
      return formatDate(raw);
    }

    return "";
  };

export class DateTemplate extends React.Component<DateTemplatePropTypes, DateTemplateStateTypes> {
  static defaultProps = {
    formatValue    : formatRawDate,
    normalizeValue : normalizeRawDate,
  };

  state: DateTemplateStateTypes;
  handleBlur: () => void;
  handleKeyDown: (event: any) => void;
  handleChange: ({ target: { value } }: any) => void;


  UNSAFE_componentWillReceiveProps (nextProps: DateTemplatePropTypes) {
    const {
        input: {
          value: newValue,
        },
      } = nextProps,
      {
        value: currentValue,
      } = this.state,
      shouldRenderAgain = isValidDate(newValue) && currentValue !== newValue;

    if (newValue === "") {
      this.setState({
        value: "",
      });
    }

    if (shouldRenderAgain) {
      this.setState({
        value: formatDate(newValue),
      });
    }
  }

  constructor (props: DateTemplatePropTypes) {
    super(props);
    this.state = {
      value: formatRawDate(props.input.value),
    };

    this.handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        this.handleBlur();
      }
    };

    this.handleBlur = () => {
      const {
          onBlur,
        } = this.props.input,
        {
          input,
          normalizeValue,
        } = this.props,
        {
          value: currentValue,
        } = this.state,
        normalizedValue = normalizeValue(currentValue),
        shouldRenderAgain = normalizedValue !== "" && currentValue !== normalizedValue;

      input.onChange(normalizedValue);

      /*
       * Swallow the event to prevent Redux Form from
       * extracting the form value
       */
      onBlur();

      if (shouldRenderAgain) {
        this.setState({
          value: formatDate(normalizedValue),
        });
      }
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

  render () {
    const {
      customClass,
      input,
      label,
      onRegisterRef,
      meta: {
        submitting,
        touched,
        error,
      },
      left,
      right,
      tabIndex,
      formatValue,
      placeholder,
    } = this.props;

    return (
      <div
        className={classnames("form-group row", {
          "is-invalid": touched && error,
        })}>
        <label
          className={`${left ? left : "col-md-4 text-md-right"} form-control-label`}
          htmlFor={input.name}>
          {label}
        </label>
        <div className={right ? right : "col-md-8"}>
          <input
            {...input}
            aria-label={label}
            className={classnames(`form-control ${customClass || ""}`, {
              "is-invalid": touched && error,
            })}
            disabled={submitting}
            id={input.name}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder={placeholder || words.DateFormat}
            ref={onRegisterRef}
            tabIndex={tabIndex}
            type="text"
            value={formatValue(this.state.value)}
          />
          <div
            className="invalid-feedback">
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