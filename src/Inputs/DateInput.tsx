/* eslint-disable */
type DateInputPropTypes = {
  readonly customClass?: any;
  readonly input: any;
  readonly meta: {
    error?: string;
    submitting: boolean;
    touched: boolean;
  };
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
type DateInputStateTypes = {
  value: string;
};
import React from "react";
import classnames from "classnames";
import { formatDate, isValidDate, normalizeDate } from "../utility";
import { words } from "../utility";

const normalizeRawDate = (raw: string): string => {
  /* eslint-disable no-magic-numbers */
  if (isValidDate(raw)) {
    return normalizeDate(raw);
  }

  return raw;
};

const formatRawDate = (raw: string): string => {
  /* eslint-disable no-magic-numbers */
  if (typeof raw !== "undefined") {
    return formatDate(raw);
  }

  return "";
};

export class DateInput extends React.Component<DateInputPropTypes, DateInputStateTypes> {
  static defaultProps = {
    formatValue: formatRawDate,
    normalizeValue: normalizeRawDate
  };
  props: DateInputPropTypes;
  state: DateInputStateTypes;
  handleBlur: () => void;
  handleKeyDown: (event: any) => void;
  handleChange: () => void;

  constructor(props: DateInputPropTypes) {
    super();
    this.state = {
      value: formatRawDate(props.input.value)
    };

    this.handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        this.handleBlur();
      }
    };

    this.handleBlur = () => {
      const {
        onBlur
      } = this.props.input;
      const {
        input,
        normalizeValue
      } = this.props;
      const {
        value: currentValue
      } = this.state;
      const normalizedValue = normalizeValue(currentValue),
            shouldRenderAgain = normalizedValue !== "" && currentValue !== normalizedValue;
      input.onChange(normalizedValue);

      /*
       * Swallow the event to prevent Redux Form from
       * extracting the form value
       */
      onBlur();

      if (shouldRenderAgain) {
        this.setState({
          value: formatDate(normalizedValue)
        });
      }
    };

    this.handleChange = ({
      target: {
        value
      }
    }: any) => {
      this.props.input.onChange();

      /*
       * Update the internal state to trigger a re-render
       * using the formatted value
       */
      this.setState({
        value
      });
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: DateInputPropTypes) {
    const {
      input: {
        value: newValue
      }
    } = nextProps;
    const {
      value: currentValue
    } = this.state;
    const shouldRenderAgain = isValidDate(newValue) && currentValue !== newValue;

    if (newValue === "") {
      this.setState({
        value: ""
      });
    }

    if (shouldRenderAgain) {
      this.setState({
        value: formatDate(newValue)
      });
    }
  }

  render() {
    const {
      customClass,
      input,
      onRegisterRef,
      meta: {
        submitting,
        touched,
        error
      },
      tabIndex,
      formatValue,
      placeholder
    } = this.props;
    return <input {...input} className={classnames(`form-control ${customClass || ""}`, {
      "is-invalid": touched && error
    })} disabled={submitting} id={input.name} onBlur={this.handleBlur} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder={placeholder || words.DateFormat} ref={onRegisterRef} tabIndex={tabIndex} type="text" value={formatValue(this.state.value)} />;
  }

}