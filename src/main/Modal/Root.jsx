// @flow

import type { State } from "src/types";

type ModalRootPropTypes = {
  list: any;
};

import { connect } from "react-redux";
import React, { Fragment } from "react";

import getComponent from "./components";

import { selectors } from "main";

const mapStateToProps = (state : State) => ({
  list: selectors.getModals(state),
});

class ModalRoot extends React.Component<ModalRootPropTypes> {

  props: ModalRootPropTypes;

  shouldComponentUpdate (nextProps : ModalRootPropTypes) {
    return this.props.list !== nextProps.list;
  }

  render () {
    const { list } = this.props;

    if (list.size === 0) {
      return null;
    }

    return (
      <Fragment>
        {
          list.map((current, index) => {
            const Component = getComponent(current.get("type"));

            return (
              <Component key={index} {...current.get("props").toJS()} />
            );
          })
        }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(ModalRoot);
