// @flow
/* eslint-disable react/prefer-stateless-function, react/require-optimization */

type FocusTemplatePropTypes = {
  +autoFocus?: boolean;
  +input: any;
  +label: string;
  +placeholder: string;
  +type: string;
  +meta: {
    submitting: boolean;
    touched: boolean;
    error?: any;
  };

  +onRegisterRef: (callback : (node : any) => void) => void;
};

import React from "react";

import { InputTemplate } from "./InputTemplate";

export class FocusTemplate extends React.Component<FocusTemplatePropTypes> {
  props: FocusTemplatePropTypes;

  shouldComponentUpdate (nextProps: FocusTemplatePropTypes) {
    return (
      this.props.input !== nextProps.input ||
       this.props.label !== nextProps.label ||
       this.props.meta.submitting !== nextProps.meta.submitting ||
       this.props.meta.touched !== nextProps.meta.touched ||
       this.props.meta.error !== nextProps.meta.error
    );
  }

  render () {
    return (
      <InputTemplate {...this.props} />
    );
  }
}
