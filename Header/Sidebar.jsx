// @flow

type OwnProps = {
  ui: {
    sidebarOpen: boolean;
    mql: any;
  };
  updateUI: (newState : any) => void;
}

type OwnPropsContent = {
  updateUI: (newState : any) => void;
}

import type { Dispatch, State } from "types";

import { selectors } from "Company";

import { mql } from "utility";

export const
  mapStateToProps = (state : State) => ({
    data: selectors.getCurrentCompany(state),
  }),
  mapDispatchToProps = (dispatch : Dispatch, { ui : { sidebarOpen }, updateUI } : OwnProps) => ({
    updateSidebar () {
      updateUI({
        sidebarOpen   : !mql.matches && sidebarOpen,
        sidebarDocked : mql.matches,
      });
    },
    toggleSidebar () {
      updateUI({
        sidebarOpen   : !sidebarOpen,
        sidebarDocked : true,
      });
    },
    toggleSidebarOpen (value : boolean) {
      updateUI({
        sidebarOpen: value,
      });
    },
    closeSidebar () {
      updateUI({
        sidebarOpen   : false,
        sidebarDocked : false,
      });
    },
  }),
  mapDispatchToPropsContent = (dispatch : Dispatch, { updateUI } : OwnPropsContent) => ({
    closeSidebar () {
      updateUI({
        sidebarOpen   : false,
        sidebarDocked : false,
      });
    },
  });

export const styles = {
  sidebar: {
    zIndex: 4,
  },
  overlay: {
    zIndex: 3,
  },
};


export const uiProps = {
  key   : "general-ui",
  state : {
    showNavbar    : false,
    sidebarDocked : mql.matches,
    sidebarOpen   : false,
  },
  persist: true,
};
