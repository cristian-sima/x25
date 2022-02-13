type NidFieldPropTypes = {
  readonly input: any;
  readonly meta: {
    submitting: boolean;
    touched: boolean;
    error?: string;
  };
  readonly formID: string;
  readonly findDetailsByNid: (Nid: string | null | undefined) => () => void;
  readonly onRegisterRef: ((callback: (node: any) => void) => void) | null | undefined;
};
import React from "react";
import classnames from "classnames";
import { words } from "../../utility";

class NidField extends React.Component<NidFieldPropTypes> {
  props: NidFieldPropTypes;

  shouldComponentUpdate (nextProps: NidFieldPropTypes) {
    return this.props.input !== nextProps.input || this.props.meta.submitting !== nextProps.meta.submitting || this.props.meta.touched !== nextProps.meta.touched || this.props.meta.error !== nextProps.meta.error;
  }

  render () {
    const {
        input,
        meta: {
          error,
          submitting,
          touched,
        },
        onRegisterRef,
      } = this.props,
      {
        name,
      } = input;

    return (<div className={classnames("form-group row", {
      "is-invalid": touched && error,
    })}>
      <label
        className="
          col-md-3
          text-md-right
          form-control-label
          form-control-lg" htmlFor={name}>
        {words.PersonalID}
      </label>
      <div className="col-md-9 col-lg-6">
        <input
          {...input} aria-label={words.PersonalID} className={classnames("form-control form-control-lg", {
            "is-invalid": touched && error,
          })} disabled={submitting} id={name} name={name} placeholder="ex. 1750826256625" ref={onRegisterRef} type="text" />
        <div className="invalid-feedback">
          {touched && error ? error : null}
        </div>
      </div>
    </div>);
  }

}

export default NidField;
