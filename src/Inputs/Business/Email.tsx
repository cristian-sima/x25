/* eslint-disable no-duplicate-imports */
import React from "react";
import type { SimpleInputPropTypes } from "../SimpleInput";
import { SimpleInput } from "../SimpleInput";

const EmailInput = (props: SimpleInputPropTypes) => (
  <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className="fa fa-envelope-o" />
      </span>
    </div>
    <SimpleInput {...props} placeholder="ex. name @gmail.ro" />
  </div>
);

export default EmailInput;
