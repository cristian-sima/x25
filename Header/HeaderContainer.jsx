// @flow

import type { Dispatch, State } from "types";

type OwnProps = {
  ui: {
    showNavbar: boolean;
  };
  showNavbar: () => void;
  updateUI : (nextState : any) => void;
};

import ui from "redux-ui";
import { connect } from "react-redux";

import Header from "./Header";

import { selectors } from "main";

const
  mapStateToProps = (state : State) => ({
    accountName: selectors.getInitialInformation(state).get("Name"),
  }),
  mapDispatchToProps = (dispatch : Dispatch, { ui : { showNavbar }, updateUI } : OwnProps) => ({
    toggleNavbar () {
      updateUI({
        showNavbar: !showNavbar,
      });
    },
  });

export default ui({
  key: "general-ui",
})(connect(mapStateToProps, mapDispatchToProps)(Header));
