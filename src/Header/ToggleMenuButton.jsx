// @flow

type ToggleMenuButtonPropTypes = {
  showSidebar: () => void;
};

import React from "react";

const ToggleMenuButton = ({ showSidebar } : ToggleMenuButtonPropTypes) => (
  <button
    aria-label="Comută meniul"
    className="btn btn-outline-secondary btn-sm mr-2"
    onClick={showSidebar}
    type="button">
    <i className="fa fa-bars" />
  </button>
);

export default ToggleMenuButton;
