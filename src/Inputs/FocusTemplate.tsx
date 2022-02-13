type FocusTemplatePropTypes = {
  readonly autoFocus?: boolean;
  readonly input: any;
  readonly label: string;
  readonly placeholder: string;
  readonly type: string;
  readonly meta: {
    submitting: boolean;
    touched: boolean;
    error?: any;
  };
  readonly onRegisterRef: (callback: (node: any) => void) => void;
};

import React from "react";
import { InputTemplate } from "./InputTemplate";

export class FocusTemplate extends React.Component<FocusTemplatePropTypes> {

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
    return <InputTemplate {...this.props} />;
  }

}
