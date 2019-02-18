// @flow

import type { State, Dispatch } from "src\\types";

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

import { selectors } from "../Account/reducer";

import { isAdministratorAccount } from "../utility";

import { estimateCompanyPriceModal } from "../Payment/actions";

const
  mapStateToProps = (state : State) => {
    const data = selectors.getCurrentAccount(state);

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
    showPayModal: (id) => () => {
      dispatch(estimateCompanyPriceModal(id));
    },
  });

export default ui({
  key: "general-ui",
})(connect(mapStateToProps, mapDispatchToProps)(Header));
