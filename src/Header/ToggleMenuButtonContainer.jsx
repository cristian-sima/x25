// @flow

import type { Dispatch } from "src\\types";
import React from "react";

type OwnProps = {
  ui: any;
  updateBoard: (newState : any) => void;
}

import { connect } from "react-redux";
import { mql } from "../utility";

import ToggleMenuButton from "./ToggleMenuButton";
import Board from "../Board";

const
  mapDispatchToProps = (dispatch : Dispatch, { updateBoard } : OwnProps) => ({
    showSidebar () {
      const theMetch = mql ? mql.matches : false;

      updateBoard({
        sidebarOpen   : !theMetch,
        sidebarDocked : theMetch,
      });
    },
  });


export default (
  <Board key="general-ui">
    {connect(null, mapDispatchToProps)(ToggleMenuButton)}
  </Board>
);
