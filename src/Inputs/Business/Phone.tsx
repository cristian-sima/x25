/* eslint-disable no-duplicate-imports */
import React from "react";
import type { SimpleInputPropTypes } from "../SimpleInput";
import { SimpleInput } from "../SimpleInput";

const PhoneInput = (props: SimpleInputPropTypes) => (<div className="input-group">
  <div className="input-group-prepend">
    <span className="input-group-text">
      <i className="fa fa-phone" />
    </span>
  </div>
  <SimpleInput {...props} placeholder="ex. 0755326517" />
</div>);

export default PhoneInput;
