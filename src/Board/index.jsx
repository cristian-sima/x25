// @flow

import type { Dispatch, State } from "src\\types";

type BoardPropTypes = {
  board: any;
  children: any;
  volatile? : bool;
  initBoard: () => void;
  updateBoard: () => void;
  clearFromBoard: () => void;
};

import { clearFromBoard, updateBoard, initBoard, getFromBoard } from "./reducer";

import React from "react";
import { connect } from "react-redux";

const
  mapStateToProps = (state : State, { key } : { key : string }) => ({
    board: getFromBoard(state, key),
  }),
  mapDispatchToProps = (dispatch : Dispatch, { key, init } : { key : string, init : any }) => ({
    initBoard () {
      dispatch(initBoard(key, init));
    },
    clearFromBoard () {
      dispatch(clearFromBoard(key));
    },
    updateBoard (value : any) {
      dispatch(updateBoard(key, value));
    },
  });

class Board extends React.Component<BoardPropTypes> {
  props: BoardPropTypes;

  componentDidMount () {
    this.props.initBoard();
  }

  shouldComponentUpdate () {
    return (
      true
    );
  }

  componentWillUnmount () {
    if (this.props.volatile) {
      this.props.clearFromBoard();
    }
  }

  render () {
    const { children } = this.props;

    if (children === null) {
      return null;
    }

    return (
      React.cloneElement(children, {
        ...this.props,
      })
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
