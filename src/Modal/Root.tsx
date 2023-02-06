import React from "react";
import { connect } from "react-redux";
import getComponent from "./getComponent";
import { selectors } from "./reducer";
import type { State } from "src/types";

type ModalRootPropTypes = {
  readonly list: any;
};

const mapStateToProps = (state: State) => ({
  list: selectors.getModals(state),
});

class ModalRoot extends React.Component<ModalRootPropTypes> {

  shouldComponentUpdate (nextProps: ModalRootPropTypes) {
    return this.props.list !== nextProps.list;
  }

  render () {
    const { list } = this.props;

    if (list.size === 0) {
      return null;
    }

    return list.map((current : any, index : number) => {
      const
        modalType = current.get("type"),
        Component = getComponent(modalType),
        isTheLastOne = index !== list.size - 1;

      if (typeof Component === "undefined") {
        return (
          <div key="no-modal">
            {`No MODAL component for the type [${modalType}] in Modal/components.jsx`}
          </div>
        );
      }

      return (
        <Component
          doNotCloseByEscape={isTheLastOne}
          key={index}
          {...current.get("props").toJS()}
        />
      );
    });
  }

}

export default connect(mapStateToProps)(ModalRoot);
