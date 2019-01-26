// @flow

import type { State, Dispatch } from "src/types";

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

import { selectors } from "./Account/reducer";

import { isAdministratorAccount } from "../utility";

const
  mapStateToProps = (state : State) => {
    const data = selectors.getInitialInformation(state);

    return {
      accountName : data.get("Name"),
      isAdmin     : isAdministratorAccount(data.get("Type")),
    };
  },
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