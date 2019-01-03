// @flow

import type { Dispatch } from "src/types";

type OwnProps = {
  ui: {
    mql: any;
    sidebarOpen: boolean;
  };
  updateUI: (newState : any) => void;
}

import ui from "redux-ui";
import { connect } from "react-redux";

import ToggleMenuButton from "./ToggleMenuButton";

const mql = window.matchMedia("(min-width: 800px)");

const
  mapDispatchToProps = (dispatch : Dispatch, { updateUI } : OwnProps) => ({
    showSidebar () {
      const theMetch = mql.matches;

      updateUI({
        sidebarOpen   : !theMetch,
        sidebarDocked : theMetch,
      });
    },
  });

export default ui({
  key: "general-ui",
})(connect(null, mapDispatchToProps)(ToggleMenuButton));
