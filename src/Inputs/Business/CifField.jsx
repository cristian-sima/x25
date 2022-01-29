// @flow

type CifFieldPropTypes = {
  +input: any;
  +meta: {
    submitting: boolean;
    touched: boolean;
    error?: string;
  };
  +formID: string;
  +findDetailsByCif: (cif: ?string) => () => void;
  +handleKeyPressed: (event : any) => void;
  +onRegisterRef?: (callback : (node : any) => void) => void;
};


import React from "react";
import classnames from "classnames";

import words from "../../words";

class CifField extends React.Component<CifFieldPropTypes> {
  props: CifFieldPropTypes;

  shouldComponentUpdate (nextProps : CifFieldPropTypes) {
    return (
      this.props.input !== nextProps.input ||
      this.props.meta.submitting !== nextProps.meta.submitting ||
      this.props.meta.touched !== nextProps.meta.touched ||
      this.props.meta.error !== nextProps.meta.error
    );
  }

  render () {
    const {
      input,
      findDetailsByCif,
      meta: {
        error,
        submitting,
        touched,
      },
      handleKeyPressed,
      onRegisterRef,
    } = this.props;

    const { name } = input;

    return (
      <div className="form-group row">
        <label
          className="
          col-md-3
          text-md-right
          form-control-label
          form-control-lg" htmlFor={name}>
          {words.FiscalID}
        </label>
        <div className="col-md-9 col-lg-6">
          <div className="input-group">
            <input
              {...input}
              aria-label={words.FiscalID}
              className={classnames("form-control form-control-lg", {
                "is-invalid": touched && error,
              })}
              disabled={submitting}
              id={name}
              name={name}
              onKeyPress={handleKeyPressed}
              placeholder="ex. 51584214"
              ref={onRegisterRef}
              type="text"
            />
            <div className="input-group-append">
              <button
                className="btn btn-secondary btn-lg btn-info"
                disabled={submitting}
                onClick={findDetailsByCif(input.value)}
                title={words.GetDataFromInternet}
                type="button">
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
          <div className="invalid-feedback is-valid">
            { touched && error ? error : null }
          </div>
        </div>
      </div>
    );
  }
}

export default CifField;
